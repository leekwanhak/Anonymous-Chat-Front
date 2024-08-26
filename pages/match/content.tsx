import type { NextPage } from "next";

import { useRouter } from "next/router";

export type MatchPartnerType = {
  // department_img_path: string;
  name: string;
  department: string;
  partner: any;
};

//※ 1. React.FC로 React 컴포넌트 정의
// type MainLayoutProps = {
//   children: React.ReactNode;
// };
// const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
//   return (
//     <div>
//       {children}
//     </div>
//   );
// };
// export default MainLayout;
// 설명:
// TypeScript에서 MainLayoutProps라는 타입을 정의하는 코드입니다. 이 타입은 React 컴포넌트의 props로 사용됩니다.
// { children: React.ReactNode; }: 이 타입은 children이라는 하나의 속성을 가지며, 그 타입은 React.ReactNode입니다.
// React.ReactNode는 React에서 렌더링할 수 있는 모든 것을 나타내는 타입입니다. 문자열, 숫자, React 요소, 배열, Fragment 등 다양한 타입을 포함할 수 있습니다.(주로 React 컴포넌트의 props 타입으로 사용됩니다.)
// ※ 2. NextPage로 페이지 컴포넌트 정의
// import { NextPage } from 'next';
// type Depth4FrameType = {
//   title: string;
//   content: string;
// };
// const Depth4Frame: NextPage<Depth4FrameType> = ({ title, content }) => {
//   return (
//     <div>
//       <h1>{title}</h1>
//       <p>{content}</p>
//     </div>
//   );
// };
// export default Depth4Frame;
// 설명: NextPage는 Next.js에서 페이지 컴포넌트를 정의할 때 사용하는 타입입니다. 이 타입은 기본적으로 React의 함수형 컴포넌트 타입인 React.FC와 유사하지만, Next.js의 페이지 특화 기능을 포함합니다.
const MatchPartner: NextPage<MatchPartnerType> = ({
  name,
  department,
  partner,
}) => {
  const router = useRouter();

  //채널목록에서 참여하기 버튼클릭시 선택 채널번호를 이용해 채팅방 컴포넌트로 이동하기
  const entryChat = async (cid: number) => {
    router.push(`/chat?cid=${cid.toString()}`);
  };

  return (
    <div className="self-stretch flex flex-col items-start justify-start p-4 box-border max-w-full text-left text-sm text-steelblue font-plus-jakarta-sans">
      <div className="self-stretch rounded-xl flex flex-row items-start justify-start max-w-full [row-gap:20px] mq950:flex-wrap">
        {/* <img
          className="h-64 flex-1 relative rounded-xl max-w-full overflow-hidden object-cover min-w-[218px] mq950:flex-1"
          loading="lazy"
          alt=""
          src={depth6Frame0}
        /> */}
        <div className="flex-[0.9046] flex flex-col items-start justify-center p-4 box-border gap-1 min-w-[288px] max-w-full mq950:flex-1">
          <div className="self-stretch flex flex-col items-start justify-start">
            <div className="self-stretch relative leading-[21px]">
              Match of the day
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start text-lg text-white">
            <b className="self-stretch relative leading-[23px]">{name}</b>
          </div>
          <div className="self-stretch flex flex-row items-end justify-between gap-5 text-base mq450:flex-wrap">
            <div className="flex flex-col items-start justify-start">
              <div className="relative leading-[24px] inline-block min-w-[99px]">
                {department}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                entryChat(partner.member_id);
              }}
              className="cursor-pointer [border:none] py-[5.5px] px-4 bg-mediumblue w-[100px] rounded-2xl overflow-hidden shrink-0 flex flex-row items-center justify-center box-border min-w-[84px] max-w-[480px] mq700:max-w-full"
            >
              <div className="flex-1 overflow-hidden flex flex-col items-center justify-start">
                <div className="self-stretch relative text-sm leading-[21px] font-medium font-plus-jakarta-sans text-white text-center overflow-hidden text-ellipsis whitespace-nowrap">
                  Start Chat
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchPartner;
