"use server";

import { revalidatePath } from "next/cache";

import { connectToDB } from "../mongoose";

import User from "../model/user.model";
import Bites from "../model/bites.model";
// import Community from "../models/community.model";



interface Params {
  text: string,
  author: string,
  communityId: string | null,
  path: string,
}

export async function createBites({ text, author, communityId, path }: Params
) {
  try {
    connectToDB();

    

    const createdBites = await Bites.create({
      text,
      author,
      community: null, // Assign communityId if provided, or leave it null for personal account
    });

    // Update User model
    await User.findByIdAndUpdate(author, {
      $push: { Bites: createdBites._id },
    });

   

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create Bites: ${error.message}`);
  }
}


export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    connectToDB();
  
    // Calculate the number of posts to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize;
  
    // Create a query to fetch the posts that have no parent (top-level Bitess) (a Bites that is not a comment/reply).
    const postsQuery = Bites.find({ parentId: { $in: [null, undefined] } })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({
        path: "author",
        model: User,
      })
     
      .populate({
        path: "children", // Populate the children field
        populate: {
          path: "author", // Populate the author field within children
          model: User,
          select: "_id name parentId image", // Select only _id and username fields of the author
        },
      });
  
    // Count the total number of top-level posts (Bitess) i.e., Bitess that are not comments.
    const totalPostsCount = await Bites.countDocuments({
      parentId: { $in: [null, undefined] },
    }); // Get the total count of posts
  
    const posts = await postsQuery.exec();
  
    const isNext = totalPostsCount > skipAmount + posts.length;
  
    return { posts, isNext };
  }




  export async function fetchBiteById(BitesId: string) {
    connectToDB();
  
    try {
      const bite = await Bites.findById(BitesId)
        .populate({
          path: "author",
          model: User,
          select: "_id id name image",
        }) // Populate the author field with _id and username
        // .populate({
        //   path: "community",
        //   model: Community,
        //   select: "_id id name image",
        // }) // Populate the community field with _id and name
        .populate({
          path: "children", // Populate the children field
          populate: [
            {
              path: "author", // Populate the author field within children
              model: User,
              select: "_id id name parentId image", // Select only _id and username fields of the author
            },
            {
              path: "children", // Populate the children field within children
              model: Bites, // The model of the nested children (assuming it's the same "Bites" model)
              populate: {
                path: "author", // Populate the author field within nested children
                model: User,
                select: "_id id name parentId image", // Select only _id and username fields of the author
              },
            },
          ],
        })
        .exec();
  
      return bite;
    } catch (err) {
      console.error("Error while fetching Bites:", err);
      throw new Error("Unable to fetch Bites");
    }
  }


  export async function addCommentToBites(
    Biteid: string,
    commentText: string,
    userId: string,
    path: string
  ) {
    connectToDB();
  
    try {
      // Find the original thread by its ID
      const originalThread = await Bites.findById(Biteid);
  
      if (!originalThread) {
        throw new Error("Thread not found");
      }
  
      // Create the new comment thread
      const commentThread = new Bites({
        text: commentText,
        author: userId,
        parentId: Biteid, // Set the parentId to the original thread's ID
      });
  
      // Save the comment thread to the database
      const savedCommentThread = await commentThread.save();
  
      // Add the comment thread's ID to the original thread's children array
      originalThread.children.push(savedCommentThread._id);
  
      // Save the updated original thread to the database
      await originalThread.save();
  
      revalidatePath(path);
    } catch (err) {
      console.error("Error while adding comment:", err);
      throw new Error("Unable to add comment");
    }
  }
  



 