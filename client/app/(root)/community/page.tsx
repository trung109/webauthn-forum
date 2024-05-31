import UserCard from "@/helper/components/cards/UserCard";
import Filter from "@/helper/components/shared/Filter";
import LocalSearchBar from "@/helper/components/shared/search/LocalSearchBar";
import { UserFilters } from "@/helper/constants/filters";

const Page = async () => {
  // const result = await getAllUsers({})

  // sample result
  interface UserModel {
    username: string;
    id: string;
    email: string;
    photoUrl: string;
    role: string;
    status: string;
  }

  const result = [
    {
      username: "DuyAnh",
      id: "1",
      email: "abc@vl.com",
      photoUrl: "/assets/images/default-avatar.jpg",
      role: "user",
      status: "active",
    },
    {
      username: "GiaHuy",
      id: "2",
      email: "giahuy@vl1.com",
      photoUrl: "/assets/images/default-avatar.jpg",
      role: "user",
      status: "active",
    },
    {
      username: "QuocTrung",
      id: "3",
      email: "quoctrung@vl.com",
      photoUrl: "/assets/images/default-avatar.jpg",
      role: "user",
      status: "active",
    },
  ];

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
        {result.length > 0 ? (
          result.map((user: UserModel) => (
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
