import React, { useState } from 'react'
import 'flowbite'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Search from '../components/Search'
import ButtonsShiftTable from '../components/ButtonsShiftTable'
import AvatarHover from '@/components/AvatarHover'
import editIcon from '../assets/ico/edit.svg'
import profile from '../assets/img/cyber-punk.jpeg'
import boy1 from '../assets/img/boy1.jpg'
import boy2 from '../assets/img/boy2.jpg'
import boy3 from '../assets/img/boy3.png'
import girl1 from '../assets/img/girl1.jpg'
import girl2 from '../assets/img/girl2.jpg'

const schedule = () => {
  // success message in add shift form
  const [successMessage, setSuccessMessage] = useState('')

  const handleUpdateData = () => {
    setSuccessMessage('Shift updated successfully!')
  }

  const handleInsertData = () => {
    setSuccessMessage('Shift added successfully!')
  }

  return (
    <div className="pb-4 h-screen max-w-screen bg-white dark:bg-gray-800 dark:border-gray-700">
      {/* top navigation bar */}
      <Navbar />

      {/* tabs and table */}
      <div className="pr-6 pl-5 max-w-screen lg:mt-4">
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
                    Person (A-Z)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Schedule Time
                  </button>
                </li>
              </ul>
            </div>
            <Search />
          </div>
          <ButtonsShiftTable />
        </div>

        {/* trainers table */}
        <div
          className="relative shadow-md sm:rounded-lg border-l-4 border-l-[#8329F5] h-full overflow-y-auto lg:mt-4"
          style={{ height: 'calc(100vh - 190px)' }}
        >
          <div className="h-full overflow-y-auto">
            <table className="bg-black-200 w-full text-sm text-left text-gray-500 dark:text-gray-400">
              {/* header */}
              <thead className="sticky top-0 z-20 text-sm text-regular text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-[0.8rem]">
                    Shift Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-[0.8rem]">
                    Monday
                  </th>
                  <th scope="col" className="px-6 py-3 text-[0.8rem]">
                    Tuesday
                  </th>
                  <th scope="col" className="px-6 py-3 text-[0.8rem]">
                    Wednesday
                  </th>
                  <th scope="col" className="px-6 py-3 text-[0.8rem]">
                    Thursday
                  </th>
                  <th scope="col" className="px-6 py-3 text-[0.8rem]">
                    Friday
                  </th>
                  <th scope="col" className="px-6 py-3 text-[0.8rem]">
                    Saturday
                  </th>
                  <th scope="col" className="px-6 py-3 text-[0.8rem] ">
                    Action
                  </th>
                </tr>
              </thead>
              {/* data */}
              <tbody>
                {/* first row */}
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  {/* time column */}
                  <td className="px-6 py-2">9:00 AM - 11:00 AM</td>
                  {/* monday column */}
                  <td className="px-6 py-2">
                    <div className="flex flex-row">
                      <Image
                        src={profile}
                        alt="user profile"
                        className="w-9 h-9 rounded-full mr-[-0.5rem]"
                        data-popover-target="popover-bottom"
                        data-popover-placement="bottom"
                      />
                      <Image
                        src={boy1}
                        alt="user profile"
                        className="w-9 h-9 rounded-full mr-[-0.5rem]"
                      />
                      <Image
                        src={girl2}
                        alt="user profile"
                        className="w-9 h-9 rounded-full mr-[-0.5rem]"
                      />
                    </div>
                    {/* profile hover */}
                    <div
                      data-popover
                      id="popover-bottom"
                      role="tooltip"
                      className="absolute z-10 invisible inline-block xl:w-[28rem] text-sm text-gray-500 transition-opacity duration-100 bg-gray-200 border-[#D55458] rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 border-t-[0.15rem]"
                    >
                      <AvatarHover />
                    </div>
                  </td>

                  {/* tuesday column */}
                  <td className="px-6 py-2">
                    <div className="flex flex-row">
                      <Image
                        src={profile}
                        alt="user profile"
                        className="w-9 h-9 rounded-full mr-[-0.5rem]"
                      />
                      <Image
                        src={boy1}
                        alt="user profile"
                        className="w-9 h-9 rounded-full mr-[-0.5rem]"
                      />
                      <Image
                        src={girl2}
                        alt="user profile"
                        className="w-9 h-9 rounded-full mr-[-0.5rem]"
                      />
                    </div>
                  </td>
                  {/* wednesday column */}
                  <td className="px-6 py-2">
                    <div className="flex flex-row">
                      <Image
                        src={profile}
                        alt="user profile"
                        className="w-9 h-9 rounded-full mr-[-0.5rem]"
                      />
                      <Image
                        src={boy1}
                        alt="user profile"
                        className="w-9 h-9 rounded-full mr-[-0.5rem]"
                      />
                      <Image
                        src={girl2}
                        alt="user profile"
                        className="w-9 h-9 rounded-full mr-[-0.5rem]"
                      />
                    </div>
                  </td>
                  {/* thursday column */}
                  <td className="px-6 py-2">
                    <div className="flex flex-row">
                      <Image
                        src={profile}
                        alt="user profile"
                        className="w-9 h-9 rounded-full mr-[-0.5rem]"
                      />
                      <Image
                        src={boy1}
                        alt="user profile"
                        className="w-9 h-9 rounded-full mr-[-0.5rem]"
                      />
                      <Image
                        src={girl2}
                        alt="user profile"
                        className="w-9 h-9 rounded-full mr-[-0.5rem]"
                      />
                    </div>
                  </td>
                  {/* friday column */}
                  <td className="px-6 py-2">
                    <div className="flex flex-row">
                      <Image
                        src={profile}
                        alt="user profile"
                        className="w-9 h-9 rounded-full mr-[-0.5rem]"
                      />
                      <Image
                        src={boy1}
                        alt="user profile"
                        className="w-9 h-9 rounded-full mr-[-0.5rem]"
                      />
                      <Image
                        src={girl2}
                        alt="user profile"
                        className="w-9 h-9 rounded-full mr-[-0.5rem]"
                      />
                    </div>
                  </td>
                  {/* saturday column */}
                  <td className="px-6 py-2">
                    <div className="flex flex-row">
                      <Image
                        src={boy2}
                        alt="user profile"
                        className="w-9 h-9 rounded-full mr-[-0.5rem]"
                      />
                    </div>
                  </td>
                  {/* action column */}
                  <td className="px-[2.2rem] py-2">
                    <a
                      href="#"
                      data-modal-target="edit-modal"
                      data-modal-toggle="edit-modal"
                      className="w-full font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      <Image src={editIcon} alt="/" className="w-[1.2rem]" />
                    </a>
                  </td>
                </tr>

                {/* Second row */}
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-2">10:00 AM - 11:00 AM</td>
                  <td className="px-6 py-2">
                    <div className="flex flex-row">
                      <Image
                        src={boy3}
                        alt="user profile"
                        className="w-9 h-9 rounded-full mr-[-0.5rem]"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-2">
                    <div className="flex flex-row">
                      <Image
                        src={boy3}
                        alt="user profile"
                        className="w-9 h-9 rounded-full mr-[-0.5rem]"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-2">
                    <div className="flex flex-row">
                      <Image
                        src={boy3}
                        alt="user profile"
                        className="w-9 h-9 rounded-full mr-[-0.5rem]"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-2">
                    <div className="flex flex-row">
                      <Image
                        src={boy3}
                        alt="user profile"
                        className="w-9 h-9 rounded-full mr-[-0.5rem]"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-2">
                    <div className="flex flex-row">
                      <Image
                        src={girl1}
                        alt="user profile"
                        className="w-9 h-9 rounded-full mr-[-0.5rem]"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-2">
                    <div className="flex flex-row">
                      <Image
                        src={boy2}
                        alt="user profile"
                        className="w-9 h-9 rounded-full mr-[-0.5rem]"
                      />
                    </div>
                  </td>
                  <td className="px-[2.2rem] py-2">
                    <a
                      href="#"
                      data-modal-target="edit-modal"
                      data-modal-toggle="edit-modal"
                      className="w-full font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      <Image src={editIcon} alt="/" className="w-[1.2rem]" />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* modal for add trainer form */}
        <div
          id="add-modal"
          aria-hidden="true"
          className="z-50 fixed top-0 left-0 right-0 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative w-[52rem] max-h-full">
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
              <div className="px-6 py-6 lg:px-8 font-thin">
                {/* title */}
                <h3 className="mb-8 text-xl font-medium text-gray-900 dark:text-white text-center">
                  Add Shift
                </h3>
                {/* form */}
                <form className="space-y-6" action="#" autoComplete="off">
                  <div className="grid gap-12 mb-4 md:grid-cols-2 w-full">
                    {/* trainers dropdown button */}
                    <div className="relative">
                      <label className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
                        Select Trainers{' '}
                      </label>
                      <select
                        id="availableDaySelect"
                        className="mt-1 text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full flex justify-between border-none"
                      >
                        <option value="">Select</option>
                        <option value="Garfin, April Jane">
                          Garfin, April Jane
                        </option>
                      </select>
                    </div>

                    {/* repeat every */}
                    <div>
                      <label className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
                        Repeat every{' '}
                      </label>
                      <div className="mt-1 flex">
                        <input
                          className="w-20 text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 border-none ml-[0.01rem] dark:focus:ring-blue-800"
                          type="number"
                          placeholder="1"
                        />
                        <select
                          id="availableDaySelect"
                          className="ml-[-0.4rem] text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-28 flex justify-between border-none"
                        >
                          <option value="">Select</option>
                          <option value="daily">daily</option>
                          <option value="weekly">weekly</option>
                          <option value="monthly">monthly</option>
                          <option value="yearly">yearly</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-12 mb-4 md:grid-cols-2">
                    {/* time */}
                    <div className="w-full">
                      <label className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
                        Set Time
                      </label>
                      <div className="mt-1">
                        <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          From :{' '}
                        </label>
                        <input
                          className="max-w-full text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 border-none ml-[0.01rem] dark:focus:ring-blue-800"
                          type="time"
                        />

                        <label className="ml-4 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          To :{' '}
                        </label>
                        <input
                          className="max-w-full text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 border-none ml-[0.01rem] dark:focus:ring-blue-800"
                          type="time"
                        />
                      </div>
                    </div>

                    {/* repeat day selection */}
                    <div>
                      <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Repeat on :{' '}
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

                  <div className="grid gap-12 mb-4 md:grid-cols-2">
                    {/* start date */}
                    <div>
                      <label
                        htmlFor="last_name"
                        className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Start date :{' '}
                      </label>
                      <input
                        className="mt-1 w-[19.41rem] text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 border-none ml-[0.01rem] dark:focus:ring-blue-800"
                        type="date"
                      />
                    </div>

                    {/* ends in */}
                    <div className="mt-4">
                      <label
                        htmlFor="last_name"
                        className="text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Ends :{' '}
                      </label>
                      {/* never */}
                      <div className="flex items-center mb-4 mt-4">
                        <input
                          id="default-radio-1"
                          type="radio"
                          value=""
                          name="default-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-radio-1"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Never
                        </label>
                      </div>
                      {/* on */}
                      <div className="flex items-center">
                        <input
                          checked
                          id="default-radio-2"
                          type="radio"
                          value=""
                          name="default-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-radio-2"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          On
                        </label>
                        <input
                          className="ml-8 max-w-full text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 border-none dark:focus:ring-blue-800"
                          type="date"
                        />
                      </div>
                      {/* after */}
                      <div className="flex items-center mt-4">
                        <input
                          checked
                          id="default-radio-2"
                          type="radio"
                          value=""
                          name="default-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-radio-2"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          After
                        </label>
                        <div className="ml-4">
                          <input
                            className="w-20 text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 border-none ml-4 dark:focus:ring-blue-800 z-40"
                            placeholder="4"
                            type="number"
                          />
                          <label className="ml-1 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            occurences{' '}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* submit button */}
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
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* modal for edit trainer form */}
        <div
          id="edit-modal"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative w-[52rem] max-h-full">
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
              <div className="px-6 py-6 lg:px-8 font-thin">
                {/* title */}
                <h3 className="mb-8 text-xl font-medium text-gray-900 dark:text-white text-center">
                  Edit Trainer Shift
                </h3>
                {/* form */}
                <form className="space-y-6" action="#" autoComplete="off  ">
                  <div className="grid gap-12 mb-4 md:grid-cols-2 w-full">
                    {/* trainers dropdown button */}
                    <div className="relative">
                      <label className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
                        Select Trainers{' '}
                      </label>
                      <select
                        id="availableDaySelect"
                        className="mt-1 text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full flex justify-between border-none"
                      >
                        <option value="">Select</option>
                        <option value="Garfin, April Jane">
                          Garfin, April Jane
                        </option>
                      </select>
                    </div>

                    {/* repeat every */}
                    <div>
                      <label className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
                        Repeat every{' '}
                      </label>
                      <div className="mt-1 flex">
                        <input
                          className="w-20 text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 border-none ml-[0.01rem] dark:focus:ring-blue-800"
                          type="number"
                          placeholder="1"
                        />
                        <select
                          id="availableDaySelect"
                          className="ml-[-0.4rem] text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-28 flex justify-between border-none"
                        >
                          <option value="">Select</option>
                          <option value="daily">daily</option>
                          <option value="weekly">weekly</option>
                          <option value="monthly">monthly</option>
                          <option value="yearly">yearly</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-12 mb-4 md:grid-cols-2">
                    {/* time */}
                    <div className="w-full">
                      <label className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
                        Set Time
                      </label>
                      <div className="mt-1">
                        <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          From :{' '}
                        </label>
                        <input
                          className="max-w-full text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 border-none ml-[0.01rem] dark:focus:ring-blue-800"
                          type="time"
                        />

                        <label className="ml-4 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          To :{' '}
                        </label>
                        <input
                          className="max-w-full text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 border-none ml-[0.01rem] dark:focus:ring-blue-800"
                          type="time"
                        />
                      </div>
                    </div>

                    {/* repeat day selection */}
                    <div>
                      <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Repeat on :{' '}
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

                  <div className="grid gap-12 mb-4 md:grid-cols-2">
                    {/* start date */}
                    <div>
                      <label
                        htmlFor="last_name"
                        className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Start date :{' '}
                      </label>
                      <input
                        className="mt-1 w-[19.41rem] text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 border-none ml-[0.01rem] dark:focus:ring-blue-800"
                        type="date"
                      />
                    </div>

                    {/* ends in */}
                    <div className="mt-4">
                      <label
                        htmlFor="last_name"
                        className="text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Ends :{' '}
                      </label>
                      {/* never */}
                      <div className="flex items-center mb-4 mt-4">
                        <input
                          id="default-radio-1"
                          type="radio"
                          value=""
                          name="default-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-radio-1"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Never
                        </label>
                      </div>
                      {/* on */}
                      <div className="flex items-center">
                        <input
                          checked
                          id="default-radio-2"
                          type="radio"
                          value=""
                          name="default-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-radio-2"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          On
                        </label>
                        <input
                          className="ml-8 max-w-full text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 border-none dark:focus:ring-blue-800"
                          type="date"
                        />
                      </div>
                      {/* after */}
                      <div className="flex items-center mt-4">
                        <input
                          checked
                          id="default-radio-2"
                          type="radio"
                          value=""
                          name="default-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-radio-2"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          After
                        </label>
                        <div className="ml-4">
                          <input
                            className="w-20 text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 border-none ml-4 dark:focus:ring-blue-800 z-40"
                            placeholder="4"
                            type="number"
                          />
                          <label className="ml-1 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            occurences{' '}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* submit button */}
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
  )
}

export default schedule
