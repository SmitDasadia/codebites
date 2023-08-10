import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import BiteCard from "@/components/cards/BiteCard";
import { fetchBiteById } from "@/lib/actions/bites.actions";
import Comment from "@/components/forms/Comment";

export const revalidate = 0;

async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const bite = await fetchBiteById(params.id);

  return (
    <section className="relative">
      <div>
        <BiteCard
          id={bite._id}
          currentUserId={user.id}
          parentId={bite.parentId}
          content={bite.text}
          author={bite.author}
          community={bite.community}
          createdAt={bite.createdAt}
          comments={bite.children}
        />
      </div>

      <div className="mt-7">
        <Comment
          Biteid={params.id}
          currentUserImg={bite.author.image}
          currentUserId={JSON.stringify(userInfo._id)}
          
        />
      </div>

      <div className="mt-10">
        {bite.children.map((childItem: any) => (
          <BiteCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={user.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
}

export default page;
