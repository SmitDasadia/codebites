import { fetchUserPosts } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import React from 'react'
import BiteCard from '../cards/BiteCard';

interface Props {
    currentUserId: string;
    accountId: string;
    accountType: string;
  }

const BitesTab = async ({ currentUserId, accountId, accountType }: Props) => {
    let result = await fetchUserPosts(accountId)

    if(!result) redirect('/')
  return (
    <section className='mt-9 flex flex-col gap-10'>
      {result.Bites.map((bites:any) => (
        <BiteCard
              key={bites._id}
              id={bites._id}
              currentUserId={currentUserId}
              parentId={bites.parentId}
              content={bites.text}

              createdAt={bites.createdAt}
              author={accountType === "User"
                  ? { name: result.name, image: result.image, id: result.id }
                  : {
                      name: bites.author.name,
                      image: bites.author.image,
                      id: bites.author.id,
                  }} community={null} comments={[]}        />
      ))}
    </section>
  )
}

export default BitesTab