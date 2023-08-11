import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


// import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { fetchPosts } from "@/lib/actions/bites.actions";
import BiteCard from "@/components/cards/BiteCard";

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  
  
  if (!user) redirect("/sign-in");;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/welcome");

  const result = await fetchPosts(
    searchParams.page ? +searchParams.page : 1,
    30
  );

  return (
    <>
      

      <section className='mt-9 flex flex-col gap-10'>
        {result.posts.length === 0 ? (
          <p className='no-result'>No Bites found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <BiteCard
                key={post._id}
                id={post._id}
                currentUserId={user.id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>

     
    </>
  );
}

export default Home;
