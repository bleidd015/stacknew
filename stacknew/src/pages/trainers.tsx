import React, { useState, useEffect } from "react";
import "flowbite";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import ButtonsTrainersTable from "../components/ButtonsTrainersTable";
import editIcon from "../assets/ico/edit.svg";
import discord from "../assets/logo/discord.svg";
import github from "../assets/logo/github.svg";
import linkedin from "../assets/logo/linkedin.svg";
import gmail from "../assets/logo/gmail.svg";
import boy1 from "../assets/img/boy1.jpg";
import girl1 from "../assets/img/girl1.jpg";
import girl2 from "../assets/img/girl2.jpg";
import { prisma } from "../../lib/prisma";
import { GetServerSideProps } from "next";

interface FormData {
  first_name: string;
  last_name: string;
  nickname: string;
  address: string;
  mobile_no: string;
  email: string;
  github: string;
  linkedin: string;
  discord_id: string;
  active_status: boolean;
  skill: string;
  role: string;
  avail_day: string[];
  avail_time: string;
  date_onboard: string;
}

interface TrainersProps {
  trainersData: trainers[];
}

interface trainers {
  id: string;
  first_name: string;
  last_name: string;
  nickname: string;
  address: string;
  mobile_no: string;
  email: string;
  github: string;
  linkedin: string;
  discord_id: string;
  active_status: boolean;
  skill: string;
  role: string;
  avail_day: string[];
  avail_time: string;
  date_onboard: string;
}

// async function getTrainers() {
//   const res = await fetch('http://localhost:3000/api/getTrainer')
//   if (!res.ok){
//     console.log("==============================================================================================")
//     console.log(JSON.stringify(res))
//   }
//   return res.json
// }

export async function getServerSideProps() {
  try {
    const trainersData = await prisma.trainers.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        nickname: true,
        address: true,
        mobile_no: true,
        email: true,
        github: true,
        linkedin: true,
        active_status: true,
        skill: true,
        role: true,
        avail_day: true,
        avail_time: true,
        discord_id: true,
        date_onboard: true,

      },
    });
    //maps trainers from db to serializedTrainersData
    const serializedTrainersData = trainersData.map((trainer) => ({
      ...trainer,
      id: trainer.id.toString(),
      avail_time: (trainer.avail_time?.toString()) ?? null, 
      date_onboard: (trainer.date_onboard?.toString()) ?? null
    }));
    return {
      props: {
        trainersData: serializedTrainersData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        trainersData: [],
      },
    };
  }
}

const trainers = ({ trainersData }: TrainersProps) => {
  const [form, setForm] = useState<FormData>({
    first_name: "",
    last_name: "",
    nickname: "",
    address: "",
    mobile_no: "",
    email: "",
    github: "",
    linkedin: "",
    discord_id: "",
    active_status: false,
    skill: "",
    role: "",
    avail_day: [],
    avail_time: "",
    date_onboard: "",
  });

  const [trainers, setTrainers] = useState<trainers[]>([]);
  useEffect(() => {
    setTrainers(trainersData);
  }, [trainersData]);

  async function create(data: FormData) {
    try {
      fetch("http://localhost:3000/api/addTrainer", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() =>
        setForm({
          first_name: "",
          last_name: "",
          nickname: "",
          address: "",
          mobile_no: "",
          email: "",
          github: "",
          linkedin: "",
          discord_id: "",
          active_status: false,
          skill: "",
          role: "",
          avail_day: [],
          avail_time: "",
          date_onboard: "",
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    //setForm(form => ({...form, avail_day: checked ? [...form.avail_day, name] : form.avail_day.filter(day => day !== name)}))
    if (checked) {
      setForm((form) => ({ ...form, avail_day: [...form.avail_day, name] }));
    } else {
      setForm((form) => ({
        ...form,
        avail_day: form.avail_day.filter((day) => day !== name),
      }));
    }
  };
  //for availTime
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //const { value } = event.target
    //setForm((form => ({...form, avail_time: value})))
    setForm({ ...form, avail_time: event.target.value });
  };

  const handleSubmit = async (data: FormData) => {
    try {
      await create(data);
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };

  const handleDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, date_onboard: event.target.value });
  };
  console.log(
    "========================================================================="
  );
  console.log(trainersData);

  //props checker if there really is data
  useEffect(() => {
    console.log(trainersData);
  }, [trainersData]);
  if (!trainersData || trainersData.length === 0) {
    return <div>No Data Available</div>;
  }

  // success message in add trainer form
  const [successMessage, setSuccessMessage] = useState('')

  const handleUpdateData = () => {
    setSuccessMessage('Trainer details updated successfully!')
  }

  const handleInsertData = () => {
    setSuccessMessage('Trainer added successfully!')
  }

  return (
    <div className="min-h-screen max-w-screen bg-white dark:bg-gray-800 dark:border-gray-700">
      {/* top navigation bar */}
      <Navbar />

      <div className="xl:flex w-screen">
        {/* mini dashboard */}
        <div className="max-w-screen h-auto flex mb-2">
          <dl className="pl-4 flex-row grid max-w-screen-xl mx-auto text-gray-900 dark:text-white w-32">
            <div className="py-4 max-h-full flex flex-col items-center justify-center">
              <dt className="text-5xl font-extrabold text-[#EF8134] mb-4">
                19
              </dt>
              <dd className="text-gray-500 dark:text-gray-400 text-center">
                Active Trainers
              </dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="text-5xl font-extrabold text-[#EF8134] mb-4">8</dt>
              <dd className="text-gray-500 dark:text-gray-400 text-center">
                For Pooling Trainers
              </dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="text-5xl font-extrabold text-[#EF8134] mb-4">
                27
              </dt>
              <dd className="text-gray-500 dark:text-gray-400 text-center">
                Total Trainers
              </dd>
            </div>
          </dl>
        </div>

        <div className="inline-flex w-full max-h-screen ">
          {/* tabs and table */}
          <div className="pr-6 pl-4 w-full lg:mt-4">
            <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-4 justify-start md:justify-end">
              {/* search bar with filter dropdown */}
              <div className="inline-flex w-full px-1 mr-5">
                <button
                  id="dropdown-button"
                  data-dropdown-toggle="dropdown"
                  className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 h-full"
                  type="button"
                >
                  Filter{' '}
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                {/* filter dropdown content */}
                <div
                  id="dropdown"
                  className="z-30 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdown-button"
                  >
                    <li>
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Date Onboard
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Name (A-Z)
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Status
                      </button>
                    </li>
                  </ul>
                </div>
                <Search />
              </div>
              <ButtonsTrainersTable />
            </div>

            {/* trainers table */}
            <div
              className="relative shadow-md sm:rounded-lg border-l-4 border-l-[#8329F5] h-full overflow-y-auto lg:mt-4"
              style={{ height: 'calc(100vh - 190px)' }}
            >
              <div className="h-full">
                <table className="bg-black-200 w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  {/* header */}
                  <thead className="sticky top-0 z-20 text-center text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-all-search"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="checkbox-all-search"
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </th>
                      <th scope="col" className="px-2 py-3 text-[0.8rem]">
                        Name
                      </th>
                      <th scope="col" className="px-2 py-3 text-[0.8rem]">
                        Address
                      </th>
                      <th scope="col" className="px-2 py-3 text-[0.8rem]">
                        Specific Role
                      </th>
                      <th scope="col" className="px-2 py-3 text-[0.8rem]">
                        Status
                      </th>
                      <th scope="col" className="px-2 py-3 text-[0.8rem]">
                        Date Onboard
                      </th>
                      <th scope="col" className="px-2 -3 text-[0.8rem]">
                        Skills
                      </th>
                      <th scope="col" className="px-2 py-3 text-[0.8rem]">
                        Available Schedule
                      </th>
                      <th scope="col" className="px-2 py-3 text-[0.8rem]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  {/* data */}
                  <tbody className="overflow-y-auto">
                    {trainers.map((trainer) => (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        {/* checkbox */}
                        <td className="w-4 px-4 py-4">
                          <div className="flex items-center">
                            <input
                              id="checkbox-table-search-1"
                              type="checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor="checkbox-table-search-1"
                              className="sr-only"
                            >
                              checkbox
                            </label>
                          </div>
                        </td>
                        {/* name column */}
                        <td
                          scope="row"
                          className="flex items-center px-2 py-4 h-16 text-gray-900  dark:text-white text-[0.85rem]"
                        >
                          <div className="relative w-[2.6rem] my-[2.3rem]">
                            <Image
                              className="w-auto h-9 rounded-full"
                              src={girl2}
                              alt="profile image"
                            />
                            {/* profile indicator */}
                            <span className="top-6 left-7 absolute  w-3.5 h-3.5 bg-[#CD7F32] border-2 border-white dark:border-gray-800 rounded-full"></span>
                          </div>
                          <div className="pl-3 pt-2">
                            <div className="font-semibold">
                              {trainer.last_name}, {trainer.first_name} ({trainer.nickname})
                            </div>
                            <div className="font-normal text-gray-500">
                              {trainer.mobile_no}
                            </div>
                            <div className="flex font-normal text-gray-500">
                              {trainer.email}
                            </div>
                          </div>
                        </td>
                        {/* address column */}
                        <td className="px-2 py-4 h-16 text-[0.85rem]">
                          {trainer.address}
                        </td>
                        {/* specific role column */}
                        <td className="px-2 py-4 h-16 text-[0.85rem]">
                          Trainer
                        </td>
                        {/* status column */}
                        <td className="px-2 py-4 h-16 text-[0.85rem]">
                          <div className="flex items-center text-red-500">
                            {trainer.active_status}
                          </div>
                        </td>
                        {/* date onboard column */}
                        <td className="px-2 py-4 h-16 text-[0.85rem]">
                          {trainer.date_onboard}
                        </td>
                        {/* skills column */}
                        <td className="px-2 py-4 h-16 text-[0.85rem]">
                          Java, HTML, CSS
                        </td>
                        {/* available schedule column */}
                        <td className="px-2 py-4 h-16 text-[0.85rem]">
                          {trainer.avail_day.join(", ")} - {trainer.avail_time}
                        </td>
                        {/* action column */}
                        <td className="w-36 px-2 py-4 h-16 md:inline-flex sm:flex-wrap items-center mt-[-2.1rem]">
                          <a
                            href="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            <Image
                              src={discord}
                              alt="/"
                              className="w-[1.6rem] mr-1 mb-1"
                            />
                          </a>
                          <a
                            href="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            <Image
                              src={github}
                              alt="/"
                              className="w-[1.5rem] mr-1 mb-1"
                            />
                          </a>
                          <a
                            href="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            <Image
                              src={linkedin}
                              alt="/"
                              className="w-[1.7rem] mr-1 mb-1"
                            />
                          </a>
                          <a
                            href="#"
                            data-modal-target="edit-modal"
                            data-modal-toggle="edit-modal"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            <Image
                              src={editIcon}
                              alt="/"
                              className="w-[1.4rem] mr-1 mt-[-0.5rem]"
                            />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* modal for add trainer */}
            <div
              id="add-modal"
              aria-hidden="true"
              className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
              <div className="relative w-[60rem] max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  {/* X button for close modal */}
                  <button
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-hide="add-modal"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  {/* modal content */}
                  <div className="px-6 py-6 lg:px-8">
                    {/* title */}
                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white text-center">
                      Register a Trainer
                    </h3>
                    {/* form */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault() //page wont referesh after submit
                        handleSubmit(form) //handler for submit, creates a row in table
                      }}
                      className="space-y-4"
                      action="#"
                      autoComplete="off"
                    >
                      <div className="grid gap-12 mb-4 md:grid-cols-2">
                        <div>
                          {/* personal details section */}
                          <h1 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Personal Details
                          </h1>
                          <div className="grid gap-6 mb-4 md:grid-cols-3">
                            {/* first name input */}
                            <div>
                              <input
                                type="text"
                                id="firstname"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="First name"
                                maxLength={20}
                                required
                                value={form.first_name}
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    first_name: e.target.value
                                  })
                                }
                              />
                            </div>
                            {/* last name input */}
                            <div>
                              <input
                                type="text"
                                id="lastname"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Last name"
                                maxLength={40}
                                required
                                value={form.last_name}
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    last_name: e.target.value
                                  })
                                }
                              />
                            </div>
                            {/* nickname input */}
                            <div>
                              <input
                                type="text"
                                id="nickname"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Nickname"
                                maxLength={10}
                                required
                                value={form.nickname}
                                onChange={(e) =>
                                  setForm({ ...form, nickname: e.target.value })
                                }
                              />
                            </div>
                          </div>
                          {/* address input */}
                          <div>
                            <input
                              type="text"
                              id="address"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                              placeholder="Address"
                              minLength={10}
                              maxLength={70}
                              required
                              value={form.address}
                              onChange={(e) =>
                                setForm({ ...form, address: e.target.value })
                              }
                            />
                          </div>
                          {/* mobile number input */}
                          <div>
                            <input
                              type="tel"
                              id="phone"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Mobile number (09)"
                              pattern="[0-9]{11}"
                              maxLength={11}
                              required
                              value={form.mobile_no}
                              onChange={(e) =>
                                setForm({ ...form, mobile_no: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        <div>
                          {/* links section */}
                          <h1 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Links
                          </h1>
                          {/* e-mail input */}
                          <div className="inline-flex w-full mb-4">
                            <Image
                              src={gmail}
                              alt="/"
                              className="w-[1.6rem] mr-1 mb-1"
                            />
                            <input
                              type="email"
                              id="gmail"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="E-mail address"
                              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                              maxLength={50}
                              required
                              value={form.email}
                              onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                              }
                            />
                          </div>
                          {/* discord input */}
                          <div className="inline-flex w-full mb-4">
                            <Image
                              src={discord}
                              alt="/"
                              className="w-[1.6rem] mr-1 mb-1"
                            />
                            <input
                              type="text"
                              id="discord"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Discord ID"
                              maxLength={150}
                              value={form.discord_id}
                              onChange={(e) =>
                                setForm({ ...form, discord_id: e.target.value })
                              }
                            />
                          </div>
                          {/* linkedin input */}
                          <div className="inline-flex w-full mb-4">
                            <Image
                              src={linkedin}
                              alt="/"
                              className="w-[1.6rem] mr-1 mb-1"
                            />
                            <input
                              type="text"
                              id="linkedin"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Linkedin profile link"
                              maxLength={100}
                              value={form.linkedin}
                              onChange={(e) =>
                                setForm({ ...form, linkedin: e.target.value })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-12 md:grid-cols-2">
                        <div>
                          <div>
                            {/* shift details section */}
                            <h1 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Shift Details
                            </h1>
                            <div className="grid gap-6 mb-6 md:grid-cols-2">
                              {/* date onboard */}
                              <div>
                                <h1 className="block mb-2 text-sm font-sm text-gray-900 dark:text-white">
                                  Date Onboard
                                </h1>
                                <input
                                  type="date"
                                  id="first_name"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  required
                                  onChange={handleDate}
                                />
                              </div>

                              {/* shift time */}
                              <div>
                                <label className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
                                  Shift Time
                                </label>
                                <input
                                  className="mt-1 w-full border border-gray-300 text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center items-center inline-flex dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                  required
                                  type="time"
                                  onChange={handleTimeChange}
                                />
                              </div>
                            </div>

                            {/* shift days */}
                            <div>
                              <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Shift Days
                              </label>
                              <ul className="mt-1 items-center w-full text-sm font-medium text-gray-900  rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                {/* monday */}
                                <li className="w-full  dark:border-gray-600">
                                  <div className="flex items-center pl-3">
                                    <input
                                      id="vue-checkbox-list"
                                      type="checkbox"
                                      value=""
                                      className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                      placeholder="S"
                                      name="monday"
                                      onChange={handleCheckboxChange}
                                    />
                                    <label
                                      htmlFor="vue-checkbox-list"
                                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                      Mon
                                    </label>
                                  </div>
                                </li>
                                {/* tuesday */}
                                <li className="w-full  dark:border-gray-600">
                                  <div className="flex items-center pl-3">
                                    <input
                                      id="vue-checkbox-list"
                                      type="checkbox"
                                      value=""
                                      className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                      placeholder="S"
                                      name="tuesday"
                                      onChange={handleCheckboxChange}
                                    />
                                    <label
                                      htmlFor="vue-checkbox-list"
                                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                      Tue
                                    </label>
                                  </div>
                                </li>
                                {/* wednesday */}
                                <li className="w-full  dark:border-gray-600">
                                  <div className="flex items-center pl-3">
                                    <input
                                      id="vue-checkbox-list"
                                      type="checkbox"
                                      value=""
                                      className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                      placeholder="S"
                                      name="wednesday"
                                      onChange={handleCheckboxChange}
                                    />
                                    <label
                                      htmlFor="vue-checkbox-list"
                                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                      Wed
                                    </label>
                                  </div>
                                </li>
                                {/* thursday */}
                                <li className="w-full  dark:border-gray-600">
                                  <div className="flex items-center pl-3">
                                    <input
                                      id="vue-checkbox-list"
                                      type="checkbox"
                                      value=""
                                      className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                      placeholder="S"
                                      name="thursday"
                                      onChange={handleCheckboxChange}
                                    />
                                    <label
                                      htmlFor="vue-checkbox-list"
                                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                      Thur
                                    </label>
                                  </div>
                                </li>
                                {/* friday */}
                                <li className="w-full  dark:border-gray-600">
                                  <div className="flex items-center pl-3">
                                    <input
                                      id="vue-checkbox-list"
                                      type="checkbox"
                                      value=""
                                      className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                      placeholder="S"
                                      name="friday"
                                      onChange={handleCheckboxChange}
                                    />
                                    <label
                                      htmlFor="vue-checkbox-list"
                                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                      Fri
                                    </label>
                                  </div>
                                </li>
                                {/* saturday */}
                                <li className="w-full  dark:border-gray-600">
                                  <div className="flex items-center pl-3">
                                    <input
                                      id="vue-checkbox-list"
                                      type="checkbox"
                                      value=""
                                      className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                      placeholder="S"
                                      name="saturday"
                                      onChange={handleCheckboxChange}
                                    />
                                    <label
                                      htmlFor="vue-checkbox-list"
                                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                      Sat
                                    </label>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="grid gap-4 md:grid-cols-2">
                            {/* status */}
                            <div>
                              <label className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
                                Status
                              </label>
                              <select
                                className="mt-1 text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full flex justify-between border-none h-[2.65rem]"
                                required
                              >
                                <option value="">Select Status</option>
                                <option value="Active">Active</option>
                                <option value="For Pooling">For Pooling</option>
                              </select>
                            </div>

                            {/* certification */}
                            <div>
                              <label className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
                                Certification
                              </label>
                              <select className="mt-1 text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full flex justify-between border-none h-[2.65rem]">
                                <option value="">Select Certification</option>
                                <option value="Bronze">Bronze</option>
                                <option value="Silver">Silver</option>
                                <option value="Gold">Gold</option>
                              </select>
                            </div>

                            {/* expertise */}
                            <div>
                              <label className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
                                Expertise
                              </label>
                              <input
                                type="text"
                                id="expertise"
                                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              />
                            </div>

                            {/* skills input */}
                            <div>
                              <label className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
                                Skills
                              </label>
                              <input
                                type="text"
                                id="skills"
                                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* division for submit button */}
                      <div className="mt-4 text-center">
                        {successMessage && (
                          <p className="mb-2 text-green-600 font-semibold text-center w-full">
                            {successMessage}
                          </p>
                        )}
                        <button
                          onClick={handleInsertData}
                          type="submit"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* modal for edit trainer */}
            <div
              id="edit-modal"
              aria-hidden="true"
              className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
              <div className="relative w-[60rem] max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  {/* X button for close modal */}
                  <button
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-hide="edit-modal"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  {/* modal content */}
                  <div className="px-6 py-6 lg:px-8">
                    {/* title */}
                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white text-center">
                      Update Trainer Details
                    </h3>
                    {/* form */}
                    <form className="space-y-4" action="#" autoComplete="off">
                      <div className="grid gap-12 mb-4 md:grid-cols-2">
                        <div>
                          {/* personal details section */}
                          <h1 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Personal Details
                          </h1>
                          <div className="grid gap-6 mb-4 md:grid-cols-3">
                            {/* first name input */}
                            <div>
                              <input
                                type="text"
                                id="first_name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="First name"
                                maxLength={20}
                                required
                              />
                            </div>
                            {/* last name input */}
                            <div>
                              <input
                                type="text"
                                id="last_name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Last name"
                                maxLength={40}
                                required
                              />
                            </div>
                            {/* nickname input */}
                            <div>
                              <input
                                type="text"
                                id="nickname"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Nickname"
                                maxLength={10}
                                required
                              />
                            </div>
                          </div>
                          {/* address input */}
                          <div>
                            <input
                              type="text"
                              id="company"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                              placeholder="Address"
                              maxLength={70}
                              required
                            />
                          </div>
                          {/* mobile number input */}
                          <div>
                            <input
                              type="number"
                              id="phone"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Mobile number"
                              pattern="[0-9]{11}"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          {/* links section */}
                          <h1 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Links
                          </h1>
                          {/* e-mail input */}
                          <div className="inline-flex w-full mb-4">
                            <Image
                              src={gmail}
                              alt="/"
                              className="w-[1.6rem] mr-1 mb-1"
                            />
                            <input
                              type="text"
                              id="gmail"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="E-mail address"
                              maxLength={50}
                              required
                            />
                          </div>
                          {/* discord input */}
                          <div className="inline-flex w-full mb-4">
                            <Image
                              src={discord}
                              alt="/"
                              className="w-[1.6rem] mr-1 mb-1"
                            />
                            <input
                              type="text"
                              id="discord"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Discord ID"
                              maxLength={150}
                              required
                            />
                          </div>
                          {/* linkedin input */}
                          <div className="inline-flex w-full mb-4">
                            <Image
                              src={linkedin}
                              alt="/"
                              className="w-[1.6rem] mr-1 mb-1"
                            />
                            <input
                              type="text"
                              id="linkedin"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Linkedin profile link"
                              maxLength={100}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-12 md:grid-cols-2">
                        <div>
                          <div>
                            {/* shift details section */}
                            <h1 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Shift Details
                            </h1>
                            <div className="grid gap-6 mb-6 md:grid-cols-2">
                              {/* date onboard */}
                              <div>
                                <h1 className="block mb-2 text-sm font-sm text-gray-900 dark:text-white">
                                  Date Onboard
                                </h1>
                                <input
                                  type="date"
                                  id="first_name"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  required
                                />
                              </div>

                              {/* shift time */}
                              <div>
                                <label className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
                                  Shift Time
                                </label>
                                <input
                                  className="mt-1 w-full border border-gray-300 text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center items-center inline-flex dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                  type="time"
                                />
                              </div>
                            </div>

                            {/* shift days */}
                            <div>
                              <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Shift Days
                              </label>
                              <ul className="mt-1 items-center w-full text-sm font-medium text-gray-900  rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                {/* monday */}
                                <li className="w-full  dark:border-gray-600">
                                  <div className="flex items-center pl-3">
                                    <input
                                      id="vue-checkbox-list"
                                      type="checkbox"
                                      value=""
                                      className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                      placeholder="S"
                                    />
                                    <label
                                      htmlFor="vue-checkbox-list"
                                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                      Mon
                                    </label>
                                  </div>
                                </li>
                                {/* tuesday */}
                                <li className="w-full  dark:border-gray-600">
                                  <div className="flex items-center pl-3">
                                    <input
                                      id="vue-checkbox-list"
                                      type="checkbox"
                                      value=""
                                      className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                      placeholder="S"
                                    />
                                    <label
                                      htmlFor="vue-checkbox-list"
                                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                      Tue
                                    </label>
                                  </div>
                                </li>
                                {/* wednesday */}
                                <li className="w-full  dark:border-gray-600">
                                  <div className="flex items-center pl-3">
                                    <input
                                      id="vue-checkbox-list"
                                      type="checkbox"
                                      value=""
                                      className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                      placeholder="S"
                                    />
                                    <label
                                      htmlFor="vue-checkbox-list"
                                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                      Wed
                                    </label>
                                  </div>
                                </li>
                                {/* thursday */}
                                <li className="w-full  dark:border-gray-600">
                                  <div className="flex items-center pl-3">
                                    <input
                                      id="vue-checkbox-list"
                                      type="checkbox"
                                      value=""
                                      className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                      placeholder="S"
                                    />
                                    <label
                                      htmlFor="vue-checkbox-list"
                                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                      Thur
                                    </label>
                                  </div>
                                </li>
                                {/* friday */}
                                <li className="w-full  dark:border-gray-600">
                                  <div className="flex items-center pl-3">
                                    <input
                                      id="vue-checkbox-list"
                                      type="checkbox"
                                      value=""
                                      className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                      placeholder="S"
                                    />
                                    <label
                                      htmlFor="vue-checkbox-list"
                                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                      Fri
                                    </label>
                                  </div>
                                </li>
                                {/* saturday */}
                                <li className="w-full  dark:border-gray-600">
                                  <div className="flex items-center pl-3">
                                    <input
                                      id="vue-checkbox-list"
                                      type="checkbox"
                                      value=""
                                      className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                      placeholder="S"
                                    />
                                    <label
                                      htmlFor="vue-checkbox-list"
                                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                      Sat
                                    </label>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="grid gap-4 md:grid-cols-2">
                            {/* status */}
                            <div>
                              <label className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
                                Status
                              </label>
                              <select className="mt-1 text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full flex justify-between border-none h-[2.65rem]">
                                <option value="">Select Status</option>
                                <option value="Active">Active</option>
                                <option value="For Pooling">For Pooling</option>
                              </select>
                            </div>

                            {/* certification */}
                            <div>
                              <label className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
                                Certification
                              </label>
                              <select className="mt-1 text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full flex justify-between border-none h-[2.65rem]">
                                <option value="">Select Certification</option>
                                <option value="Bronze">Bronze</option>
                                <option value="Silver">Silver</option>
                                <option value="Gold">Gold</option>
                              </select>
                            </div>

                            {/* expertise */}
                            <div>
                              <label className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
                                Expertise
                              </label>
                              <input
                                type="text"
                                id="expertise"
                                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                              />
                            </div>

                            {/* skills input */}
                            <div>
                              <label className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
                                Skills
                              </label>
                              <input
                                type="text"
                                id="skills"
                                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* division for submit button */}
                      <div className="mt-4 text-center">
                        {successMessage && (
                          <p className="mb-2 text-green-600 font-semibold text-center w-full">
                            {successMessage}
                          </p>
                        )}
                        <button
                          onClick={handleUpdateData}
                          type="submit"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default trainers;

// export async function getServerSideProps(){
//   try {
//     const response = await fetch("http://localhost:3000/api/getTrainer")
//     const trainersData = await response.json()

//     return{
//       props: {
//         trainersData
//       }
//     }
//   } catch (error) {
//     console.error(error)
//     return{
//       props: {
//         trainersData: []
//       },
//     }
//   }
// }
