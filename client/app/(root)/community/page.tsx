'use client'
import UserCard from "@/helper/components/cards/UserCard";
import Filter from "@/helper/components/shared/Filter";
import LocalSearchBar from "@/helper/components/shared/search/LocalSearchBar";
import { UserFilters } from "@/helper/constants/filters";
import { useState, useEffect } from "react";

const Page = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch("/api/user/allUsers");
        const { users } = await res.json();
        console.log(users)
        setUsers(users)
      } catch (err) {

      }
    }
    getUsers()
  }, [])


  interface UserModel {
    username: string;
    id: string;
    email: string;
    photoUrl: string;
    role: string;
    status: string;
    joinedAt: Date;
  }

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for a person"
          otherClasses="flex-1"
        />

        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {/* TODO: get all users */}
        {users.length > 0 ? (
          users.map((user: UserModel) => (
            <UserCard key={user.id} user={user}></UserCard>
          ))
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No users found</p>
          </div>
        )}
      </section>
    </>
  );
};

export default Page;
