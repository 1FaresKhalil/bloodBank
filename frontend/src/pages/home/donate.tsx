import { Button } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import Image from 'next/image';
// import Link from 'next/link';
import type { GetStaticPropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import useSWR from 'swr';

import Navbar from '@/components/app-bar';
import ErrorPage from '@/components/error';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

type BloodRequest = {
  requester_id: string;
  _id: number;
  patientName: string;
  nearestHospital: string;
  request_date: string;
  bloodType: string;
};

function Donate() {
  const {t} = useTranslation('common');
  const router = useRouter();
  let token: string | null = '';
  if (typeof window !== 'undefined' && localStorage) {
    token = localStorage.getItem('token');
  }
  // const [receiverId, setReceiverId] = React.useState<any>('');
  // Fetch profile data using SWR

  const { data: profileData, error: profileError } = useSWR(
    `${process.env.NEXT_PUBLIC_DB_URI}/admin/profile`,
    async (url) => {
      if (!token) {
        throw new Error('Token not found');
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `${token}`,
        },
      });
      return response.data;
    }
  );

  // Fetch blood request data using SWR

  const { data: bloodRequestData } = useSWR(
    `${process.env.NEXT_PUBLIC_DB_URI}/admin/bloodRequest`,
    async (url) => {
      if (!token) {
        throw new Error('Token not found');
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `${token}`,
        },
      });
      // console.log(response.data);
      return response.data;
    }
  );
  const { data: peopleWhoIChated } = useSWR(
    `${process.env.NEXT_PUBLIC_DB_URI}/website/conversation/${profileData?.user?._id}`,
    async (url: any) => {
      if (!token) {
        throw new Error('Token not found');
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `${token}`,
        },
      });
      // console.log(response.data);  // output:
      //   {
      //     "result": [
      //         {
      //             "_id": "645a46a348763afc3a5e9ad2",
      //             "members": [
      //                 "6434e05c779e306c654b38bd",
      //                 "6435ee68c9845e9cd13201b2"
      //             ],
      //             "createdAt": "2023-05-09T13:12:03.848Z",
      //             "updatedAt": "2023-05-09T13:12:03.848Z",
      //             "__v": 0
      //         },
      //         {
      //             "_id": "645a4b6b48763afc3a5e9bc2",
      //             "members": [
      //                 "6434e05c779e306c654b38bd",
      //                 "645a4afa48763afc3a5e9b5d"
      //             ],
      //             "createdAt": "2023-05-09T13:32:27.428Z",
      //             "updatedAt": "2023-05-09T13:32:27.428Z",
      //             "__v": 0
      //         }
      //     ]
      // }
      return response.data;
    }
  );
  if (profileError) {
    return <ErrorPage />;
  }
  function getCompatibleBloodTypes(bloodType: string): string[] {
    switch (bloodType) {
      case 'a+':
        return ['a+', 'ab+'];
      case 'a-':
        return ['a+', 'a-', 'ab+', 'ab-'];
      case 'b+':
        return ['b+', 'ab+'];
      case 'b-':
        return ['b+', 'b-', 'ab+', 'ab-'];
      case 'ab+':
        return ['ab+'];
      case 'ab-':
        return ['a-', 'b-', 'ab-', 'o-'];
      case 'o+':
        return ['o+', 'a+', 'b+', 'ab+'];
      case 'o-':
        return ['o+', 'o-', 'a+', 'a-', 'b+', 'b-', 'ab+', 'ab-'];
      default:
        return [];
    }
  }

  const chatHandler = (receiverId: string) => {
    const existingChat = peopleWhoIChated?.result.find((chat: any) => {
      const chatMembers = chat.members;
      return (
        chatMembers.includes(profileData?.user?._id) &&
        chatMembers.includes(receiverId)
      );
    });

    if (!existingChat) {
      axios.post(
        `${process.env.NEXT_PUBLIC_DB_URI}/website/conversation`,
        {
          senderId: profileData?.user?._id,
          receiverId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setTimeout(() => {
        router.push('/home/chat');
      }, 2000);
    }
  };

  // console.log(bloodRequestData?.bloodRequests.map((item) => console.log(item)));
  return (
    <Main meta={<Meta title="Donate" description="donate" />}>
      <div className="bg-[#eee] min-h-screen">
        <Navbar username={profileData?.user?.username} />
        <div className="donation-cards main-container grid grid-cols-12 gap-4 my-4 ">
          {bloodRequestData?.bloodRequests
            .filter((item: BloodRequest) => {
              return getCompatibleBloodTypes(
                profileData?.user?.bloodType
              ).includes(item.bloodType);
            })
            .map((item: BloodRequest) => {
              const date = item.request_date.split(',')[0];
              const [month, day, year] = (date as string).split('-');
              const formattedDate = `${day}/${month}/${year}`;
              return (
                <div
                  // eslint-disable-next-line @typescript-eslint/dot-notation
                  key={item['_id']}
                  className="donation-card col-span-12 lg:col-span-6 bg-white p-5 rounded-md"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-1">
                        <span className="opacity-60 font-size-18 text-stone-900">
                          {t('patientName')}
                        </span>
                        <span className="font-size-21">{item.patientName}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="opacity-60 font-size-18 text-stone-900">
                         {t('location')}
                        </span>
                        <span className="font-size-21">
                          {item.nearestHospital.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-1">
                        <span className="opacity-60 font-size-18 text-stone-900">
                          {t('datePosted')}
                        </span>
                        <span className="font-size-21">{formattedDate}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="opacity-60 font-size-18 text-stone-900">
                          {t('BloodType')}
                        </span>
                        <span className="font-size-21">
                          {item.bloodType.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between gap-2">
                    <Button
                      sx={{
                        bgcolor: '#ef5350',
                        '&:hover': {
                          backgroundColor: 'error.main',
                        },
                      }}
                      className="font-size-22 w-[48%] "
                      variant="contained"
                      onClick={() => {
                        chatHandler(item.requester_id);
                      }}
                      color="error"
                      // LinkComponent={Link}
                      // href="/home/chat"
                    >
                    {t('Chat')}
                    </Button>
                    <Button
                      sx={{
                        bgcolor: '#ef5350',
                        '&:hover': {
                          backgroundColor: 'error.main',
                        },
                      }}
                      className="font-size-22 w-[48%] "
                      variant="contained"
                      color="error"
                      LinkComponent={Link}
                      href="/home"
                    >
                      {t('moreDetails')}
                    </Button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Main>
  );
}

export default Donate;
export async function getStaticProps({ locale = 'en' }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
