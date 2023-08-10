import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import PostBites from "@/components/forms/PostBites";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  // fetch organization list created by user
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/welcome");

  return (
    <>
      <h1 className='head-text'>Create Bites </h1>

      <PostBites userId={userInfo._id}/>

    </>
  );
}

export default Page;
