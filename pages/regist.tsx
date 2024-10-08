//신규회원가입 페이지 컴포넌트
//호출주소 : http://localhost:3003/regist

//화면상에 데이터 관리를 위한 useState 훅 참조하기
import { useState, useEffect } from "react";

//프론트엔드 라우팅 주소 이동처리를 위한 useRouter 훅 참조하기
//내가 원하는 페이지 컴포넌트로 보내줄 수 있음
import { useRouter } from "next/router";

//백엔드 RESTFul API 통신을 위한 axios 패키지 참조하기
import axios from "axios";

import Link from "next/link";

//신규회원 가입정보 인터페이스 타입 참조하기
import { IEntryMember, IDepartment } from "@/interfaces/member";

// //★이 부분은 백엔드에서 받아온 데이터를 넣어줘야하는 데 어떻게 해야하나????
// const facultyData: IFaculty[] = [
//   //★★Faulty 인터페이스 타입을 여러 개 가질 수 있도록 배열로 만들어줌
//   {
//     faculty_id: 0,
//     faculty_name: "전체",
//   },
//   {
//     faculty_id: 1,
//     faculty_name: "전자정보대학",
//   },
//   {
//     faculty_id: 2,
//     faculty_name: "인문대학",
//   },
//   {
//     faculty_id: 3,
//     faculty_name: "공과대학",
//   },
// ];

// const departmentData: IDepartment[] = [
//   {
//     department_id: 0,
//     faculty_id: 0,
//     department_name: "전체",
//   },
//   {
//     department_id: 1,
//     faculty_id: 1,
//     department_name: "컴퓨터공학과",
//   },
//   {
//     department_id: 2,
//     faculty_id: 1,
//     department_name: "정보통신공학과",
//   },
//   {
//     department_id: 3,
//     faculty_id: 2,
//     department_name: "영어영문학과",
//   },
//   {
//     department_id: 4,
//     faculty_id: 2,
//     department_name: "국어국문학과",
//   },
//   {
//     department_id: 5,
//     faculty_id: 3,
//     department_name: "신소재공학과",
//   },
//   {
//     department_id: 6,
//     faculty_id: 3,
//     department_name: "건축공학과",
//   },
// ];

//회원가입 페이지 컴포넌트
const Regist = () => {
  //useRouter훅 객체 생성하기
  const router = useRouter();

  //학부 데이터 상태관리

  const [selectedFaculty, setSelectedFaculty] = useState<IDepartment>({
    department_id: 0,
    department_name: "",
    faculty_id: 0,
    faculty_name: "",
  }); //★★선택된 단일 학부 데이터를 관리할 것이므로 배열로 만들지 않음

  //학과 데이터 상태관리
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<IDepartment>({
    department_id: 0,
    department_name: "",
    faculty_id: 0,
    faculty_name: "",
  });

  //회원가입 페이지 처음 마운트 시 백엔드에서 학부 데이터 조회하기
  useEffect(() => {
    getDepartmentData();
  }, []);

  //백엔드에서 조회한 학부 데이터를 저장할 상태변수와 초기값 설정하기
  async function getDepartmentData() {
    try {
      const response = await axios.get(
        "http://localhost:5005/api/member/department"
      );
      console.log("백엔드에서 제공해준 채널목록:", response.data);

      setSelectedFaculty(response.data.data[0]);
      setDepartments(response.data.data);
    } catch (err) {
      console.error("백엔드 REST API 호출 중에 에러가 발생했습니다.");
    }
  }

  //신규 회원가입 정보 상태 데이터 정의 및 값 초기화처리######################
  //useState(초기값설정) 함수는 [변수, 변수값변경 세터함수] 배열을 반환한다.
  //배열의 비구조화 할당
  const [member, setMember] = useState<IEntryMember>({
    email: "",
    password: "",
    name: "",
    gender: 0,
    department_id: 0,
    faculty_id: 0,
  });

  //사용자 입력요소의 값이 변경될 때마다 데이터소스와 동기화 처리해주는 이벤트처리함수
  const memberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //...member란 현재 member상수의 복사본 객체를 생성한다는 의미
    //[]란 동적 속성(ECMA문법- 있으면 쓰고 없으면 만드는 것)
    //e.target은 Change 이벤트가 발생한 UI요소를 말한다. -> name에 마우스 커버를 놓고 입력을 하고 있으면 name 인풋박스에 onChange 이벤트가 발생한다.
    //[e.target.name - 이벤트가 발생한 요소의 name 속성값]:e.target.name(이벤트가 발생한 요소의 현재 입력 value값)
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const genderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //...member란 현재 member상수의 복사본 객체를 생성한다는 의미
    //[]란 동적 속성(ECMA문법- 있으면 쓰고 없으면 만드는 것)
    //e.target은 Change 이벤트가 발생한 UI요소를 말한다. -> name에 마우스 커버를 놓고 입력을 하고 있으면 name 인풋박스에 onChange 이벤트가 발생한다.
    //[e.target.name - 이벤트가 발생한 요소의 name 속성값]:e.target.name(이벤트가 발생한 요소의 현재 입력 value값)
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  //학부 선택 이벤트 처리기 - 학부 선택시 학부에 해당하는 학과 데이터를 조회하는 함수
  //e: React.ChangeEvent<HTMLSelectElement> 이벤트 select형변환도 사용하였음
  //e.target.value는 선택한 학부의 faculty_id값을 string 형태로 가져온다. 따라서 Number()함수를 통해 숫자로 변환해준다.
  //find()함수는 배열에서 특정 조건을 만족하는 첫번째 요소를 반환한다.
  //filter()함수는 조건을 만족하는 모든 요소를 배열로 반환한다.
  //console.log를 통해 데이터 넘어오는 값을 브라우저 콘솔에서 확인하는 것이 도움이 되었다.
  //setSelectedDepartment(); setDepartment(); 데이터 타입정의 했던 대로 그 데이터 값들을 매개변수에 넣어줘야한다.
  //학과 선택 하는 콤보박스에는 departments 값이 바뀌고 그 값 전체가 나와야한다.
  //departments를 바꿔주려면 setDepartments()를 사용해야한다는 것을 인지한 것이 큰 도움이 되었음.
  // const filteredDepartments = departments.filter(
  //   (department) => department.faculty_id === facultyId
  // );
  // setDepartments(filteredDepartments);
  //위에 같이 짰더니 departments가 바뀌지 않았다. 왜? departments는 객체형태여러개 모아놓은 배열형태이기 때문에 문자열 하나만으로는 출력할 수 없음.
  const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //선택한 단일 카테고리 정보 조회하기
    const filteredFaculty = departments.find(
      (f) => f.faculty_id === Number(e.target.value)
    );

    console.log("filteredFaculty:", filteredFaculty);

    // setSelectedFaculty(filteredFaculty);

    // //학부 선택시 해당 학부에 소속된 학과 데이터만 필터링해서 가져오기
    // const filteredDepartments = departments.filter(
    //   (d) => d.faculty_id === filteredFaculty.faculty_id
    // );

    // console.log("filteredDepartments:", filteredDepartments);

    //◈◈학과 선택을 한 후 학부를 바꾸게 되면 학과를 초기상태로 초기화 해주는 부분을 구현해야함!!!!
    //setDepartments(filteredDepartments);
    //setDepartments(departments); 이 순서대로 하면 될줄 알았는데 안됨-> 비동기 방식과 관련있나?
    // setDepartments(filteredDepartments);

    // setSelectedDepartment({
    //   department_id: 0,
    //   faculty_id: 0,
    //   department_name: "전체",
    // }); // 학부 변경 시 학과 선택 초기화
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  //회원가입 버튼 클릭시 신규 회원정보 백엔드 처리함수
  const registSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    /*onsubmit 이벤트가 발생하면 무조건 새로고침(깜빡거림) 발생하는데 사용자 입장에선 좋지 않으므로 이를 통해 방지
      e.preventDefault();는 Form Submit 이벤트가 호출되면 기본적으로 발생하는 화면 리프레시(새로 고침) 기능을 막기 위해 사용됩니다.
      폼이 제출되면 브라우저는 기본적으로 페이지를 새로 고침하여 폼 데이터를 서버로 전송합니다.
      그러나 SPA(Single Page Application)나 클라이언트 측에서 폼 데이터를 처리하고자 할 때는 이러한 새로 고침이 불필요하거나 원치 않을 수 있습니다.
      따라서 e.preventDefault();를 호출하여 폼 제출 이벤트의 기본 동작을 취소하고, 화면이 리프레시되는 현상을 방지합니다.
      이를 통해 폼 데이터를 JavaScript로 처리하거나 AJAX 요청을 통해 서버로 전송할 수 있습니다.*/
    e.preventDefault();

    try {
      /* await 사용하기 위해 registSubmit함수를 async로 선언해주었다.
      백엔드 RESTful API 중 신규회원가입 API를 fetch() ajax호출기능을 통해 가입정보를 백엔드로 전달한다.
       예시1) ES2015 자바스크립트 기본 AJAX 통신 기능하는 내장 라이브러리인 fetch를 이용해 백엔드와 통신하기
       await fetch("백엔드 API호출주소", 호출옵션);
       fetch()함수를 통해 데이터를 백엔드로 전달할 때는 반드시 json문자열 형태로 전달합니다.
       json데이터를 json 문자열로 변경해주는 자바스크립트 내장함수 -> JSON.stringify(json데이터(자바스크립트객체)) */
      //Step1) fetch()함수 호출하기
      const response = await fetch("http://localhost:5005/api/member/entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, //필수!!!! - 프론트엔드에서 제공하는 데이터 타입의 유형을 지정, json으로 보낸다고 header에 명시하는 용도
        body: JSON.stringify(member),
      });

      //Step2) error가 나지 않는 상황 - fetch()함수 호출결과 백엔드 반환 실제 데이터 추출하기
      const result = await response.json();

      if (result.code == 200) {
        console.log("백엔드에서 제공한 json데이터 확인:", result);

        //정상적으로 회원가입 된 경우 로그인 페이지 컴포넌트로 이동처리
        //router.push('이동할 주소(도메인주소는 제외)') - 프론트엔드 라우팅 주소 이동처리
        router.push("/login");
      } else {
        //★★400에러 - 동일한 이메일주소가 존재하는 경우(-> 서버에서 처리해줘야함)
        console.log("백엔드 서버 에러발생:", result.msg);
        if (result.msg == "ExistMember" && result.code == 400) {
          alert("동일한 메일주소가 존재합니다.");
          return false;
        }
      }
    } catch (err) {
      console.error("백엔드 REST API 호출 중에 에러가 발생했습니다.");
    }
  };

  return (
    <div className="flex-col bg-custom-dark-blue h-screen w-100 justify-center text-white">
      <div className="mx-auto w-full max-w-sm pt-1">
        <h1 className="mt-20 text-center  font-bold  tracking-tight ">
          Regist your account
        </h1>
      </div>

      <div className="mt-10 mx-auto w-full max-w-sm">
        {/* 신규 회원가입 폼영역*/}
        <form className="space-y-6" onSubmit={registSubmit}>
          {/* 메일주소 입력요소 영역 */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 "
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={member.email}
                onChange={memberChange}
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* 사용자 암호 입력요소 영역 */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 "
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={member.password}
                onChange={memberChange}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* 사용자 이름,성별 입력요소 영역 */}
          <div>
            <div className="items-center justify-between">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 "
              >
                Name
              </label>
              <div className="mt-2 flex ">
                {/* 성별 입력 */}
                <select
                  id="gender"
                  name="gender"
                  value={member.gender}
                  onChange={genderChange}
                  className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
                >
                  <option value="">성별</option>
                  <option value="1">남</option>
                  <option value="2">여</option>
                </select>
                {/* 이름 입력 */}
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={member.name}
                  onChange={memberChange}
                  autoComplete="current-password"
                  required
                  className="ml-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          {/* 학부선택 영역 */}
          <div className="mb-4">
            <label
              htmlFor="faculty"
              className="block text-sm font-medium leading-6 "
            >
              Select Faculty
            </label>
            <select
              id="faculty"
              value={selectedFaculty.faculty_id} //★★선택된 학부 데이터를 통해 학부 아이디값을 가져옴
              name="faculty"
              onChange={handleFacultyChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              {/* <option value="0" selected>
                존채
              </option> */}
              {/* ★★map()함수에서 사용하는 매개변수 faculty에서 category_id를 가져와야함 */}
              {departments.map((faculty, index) => (
                <option key={index} value={faculty.faculty_id}>
                  {faculty.faculty_name}
                </option>
              ))}
            </select>
          </div>

          {/*학과선택영역 */}
          {selectedFaculty && (
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium leading-6 "
              >
                Select Department
              </label>
              <select
                id="department"
                value={selectedDepartment.department_id}
                onChange={handleDepartmentChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                {departments.map((department, index) => (
                  <option key={index} value={department.department_id}>
                    {department.department_name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 회원가입 버튼 표시영역 */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Regist
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{" "}
          <Link
            href="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Regist;
