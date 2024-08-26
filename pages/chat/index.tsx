import Head from "next/head";
import React from "react";

import Link from "next/link";
//사용자간 기초 채팅기능구현 컴포넌트
import { useState, useEffect, useContext } from "react";

//전역컨텍스트 참조하기
import { GlobalContext } from "@/library/globalContext";

import { useRouter } from "next/router";

import { IMessage } from "@/interfaces/message";

//채팅 클라이언트 socket객체 참조하기
import { socket } from "@/library/socket";

const Chat = () => {
  //라우터객체 생성하기
  const router = useRouter();

  //전역 상태값에서 로그인한 사용자의 정보 조회하기 위해 컨텍스트 객체 생성
  const { globalData, setGlobalData } = useContext(GlobalContext);

  //사용자 인증토큰정보 관리 상태값 정의하기
  const [memberToken, setMemberToken] = useState<string>("");

  //현재 접속채널 상태값 정의하기
  const [channel, setChannel] = useState<number>(0);

  //채팅 메시지 입력 요소 바인딩 텍스트 상태값 정의
  const [message, setMessage] = useState<string>(""); //메시지 입력값 상태값 정의

  //채팅 메시지 목록(채팅이력정보) 상태값 정의하기
  const [messageList, setMessageList] = useState<IMessage[]>([]);

  //현재 접속한 채널번호 상태값 정의하기
  useEffect(() => {
    console.log("현재 URL주소에서 채널번호 추출하기:", router.query.cid);
    //URL주소를통해 사용자 고유번호가 전달된 경우에만 실행
    if (router.query.cid != undefined) {
      //현재 채널 고유번호 상태값 설정해주기
      setChannel(Number(router.query.cid)); //문자열로 넘어오는 데이터값을 Number()함수를 이용하여 숫자열로 바꿔줌
    }
  }, [router.isReady]); //빈배열일 때는 최초 마운트시에 실행되는 것이고 배열안에 값이 들어 있으면 그 값이 변경될 때마다 실행됨

  //현재 접속 채널정보가 변경될 때마다 실행되는 useEffect함수- 채널번호가 바뀌면 바뀐번호 채널로 채팅방에 입장하기 처리
  useEffect(() => {
    //채팅방 입장처리하기
    console.log("채팅방 채널이 변경되었습니다.", channel);
    if (channel > 0) {
      console.log("채팅방 채널이 변경되었습니다.", channel);

      //해당 변경된 채팅방에 입장처리하기
      socket.emit("entry", channel.toString(), globalData.member);
    }
  }, [channel]);

  //최초 화면이 렌더링될 때 실행되는 useEffect함수
  useEffect(() => {
    //웹브라우저 저장소에 저장된 서버에서 발급해준 JWT사용자인증정보 토큰추출하기
    const token = localStorage.getItem("token");
    if (token == undefined) {
      router.push("/login");
    }

    console.log("전역 데이터 정보 확인하기:", globalData);
    setMemberToken(token as string);

    //최초 화면이 렌더링되는 시점(최초1회)에 서버소켓 연결하기
    socket.connect(); //클라이언트 소켓과 서버 소켓이 연결을 시도함

    //서버소켓과 연결이 완료되면 실행되는 이벤트처리함수
    //서버 소켓과 연결이 완료되면 자동으로 client 소켓에서connect이벤트가 실행되고
    //connect이벤트가 실행되면 처리할 이벤트 처리할 기능 구현
    //소켓 시스템 이벤트
    socket.on("connect", () => {
      //연결이 되면 작동할 기능을 구현하는 영역
      console.log("서버소켓과 연결되었습니다.");
      console.log("전역 데이터 정보 확인하기:", globalData);
    });

    //disconnect 이벤트는 서버소켓이 끊어진경우 발생하는 이벤트
    //서버와의 연결소켓이 끊어진 경우 처리할 기능을 핸들러함수에서 처리합니다.
    //소켓 시스템 이벤트
    socket.on("disconnect", () => {
      console.log("서버소켓과 연결이 끊어졌습니다.");
    });

    //개발자 정의 클라이언트 소켓 이벤트 수신기 정의하기
    //socket.on('클라이언트 이벤트 수신기명', 서버에서 전달해준 데이터를 받는함수정의);
    socket.on("receiveAll", function (msg: IMessage) {
      console.log("서버소켓에서 전달된 데이터 확인 - receiveAll: ", msg);
      setMessageList((prev) => [...prev, msg]); //messageList를 바꿔주려면 setMessageList를 사용하고 setter함수를 이용하여 UI를 갱신해줌?????????????????????????????????????????/
    });

    socket.on("entryOk", function (msg: IMessage) {
      console.log("서버소켓에서 전달된 데이터 확인 - receiveAll: ", msg);
      setMessageList((prev) => [...prev, msg]); //messageList를 바꿔주려면 setMessageList를 사용하고 setter함수를 이용하여 UI를 갱신해줌?????????????????????????????????????????/
    });

    //해당 채팅 컴포넌트가 화면에서 사라질 때 (언마운팅시점)
    //소켓관련 이벤트를 모두 제거해줘야합니다. 그렇지 않으면 메시지를 여러번 수신할 수 있음.
    return () => {
      //socket.off(클라이언트 이벤트 수신기명); //이벤트 제거
      socket.off("connect");
      socket.off("disconnect");
      socket.off("receiveAll");
    };
  }, []);

  //메시지 전송버튼 클릭시 실행되는 함수
  const sendMessage = () => {
    //채팅서버소켓(백엔드 서버)으로 메시지를 전송한다.

    const msgData = {
      member_id: globalData.member.member_id,
      name: globalData.member.name,
      profile: "/smallprofile.svg",
      message: message,
      send_date: Date.now().toString(),
    };

    //socket.emit('백앤드 서버 이벤트명', 전송할데이터객체)
    //채팅서버소켓으로 메시지 전송
    socket.emit("channelMsg", channel.toString(), msgData);

    //메시지 입력박스 초기화
    setMessage("");
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#111122] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* 헤더영역 */}
        <header className="self-stretch  bg-custom-dark-blue border-gainsboro border-b-[1px] border-solid box-border flex flex-row items-center justify-between pt-3 px-10 pb-[11px] top-[0] z-[99] sticky max-w-full gap-0 [row-gap:20px] text-left text-lg text-white font-plus-jakarta-sans">
          <div className="flex flex-row items-center justify-start gap-4">
            <div className="flex flex-col items-start justify-start">
              <div className="w-4 h-4 relative overflow-hidden shrink-0">
                <Link className="-m-1.5 p-1.5" href="/">
                  <img
                    className="absolute top-[0px] left-[0px] w-full h-full"
                    loading="lazy"
                    alt=""
                    src="/applogo.svg"
                  />
                </Link>

                <div className="absolute top-[0px] left-[0px] w-[13px] h-[13px]" />
              </div>
            </div>
            <div className="flex flex-col items-start justify-start">
              <a className="[text-decoration:none] relative leading-[23px] font-bold text-[inherit] inline-block min-w-[78px] whitespace-nowrap">
                Midnight
              </a>
            </div>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex gap-2">
              <Link
                href="/match"
                className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#242447] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
              >
                <div
                  className="text-white"
                  data-icon="ChatCircleDots"
                  data-size="20px"
                  data-weight="regular"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
                  </svg>
                </div>
              </Link>
            </div>
            <img
              className="h-10 w-10 relative rounded-xl overflow-hidden shrink-0 object-cover min-h-[40px]"
              loading="lazy"
              alt=""
              src="/smallprofile.svg"
            />
          </div>
        </header>

        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] py-5 max-w-[960px] flex-1">
            {/* 메시지 목록 출력영역 */}
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  {messageList.map((msg, index) =>
                    msg.member_id === globalData.member.member_id ? (
                      // 오른쪽 본인 메시지 출력영역
                      <div
                        key={index}
                        className="col-start-6 col-end-13 p-3 rounded-lg"
                      >
                        <div className="flex items-center justify-start flex-row-reverse">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                            <div>{msg.message}</div>
                            <div className="absolute w-[200px] text-right text-xs bottom-0 right-0 -mb-5 text-gray-500">
                              {msg.name} {msg.send_date}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // 왼쪾 다른 사용자 메시지 출력 영역
                      <div
                        key={index}
                        className="col-start-1 col-end-8 p-3 rounded-lg"
                      >
                        <div className="flex flex-row items-center">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                            <div>{msg.message}</div>
                            <div className="absolute w-[200px] text-xs bottom-0 left-0 -mb-5 text-gray-500">
                              {msg.name} {msg.send_date}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* 메시지 입력 및 보내기 영역 */}
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              {/* 파일첨부버튼영역 */}
              <div>
                <button className="flex items-center justify-center bg-white text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                  </svg>
                </button>
              </div>

              {/* 메시지 입력요소 영역 */}
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    name={message}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    className="flex w-full  focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  />
                </div>
              </div>

              {/* 메시지 전송버튼 영역 */}
              <div className="ml-6">
                <button
                  type="button"
                  onClick={sendMessage}
                  className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                >
                  <span>Send</span>
                  <span className="ml-2">
                    <svg
                      className="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            {/* 카운트 영역 */}
            <div className="flex gap-4 py-6 px-4">
              <div className="flex grow basis-0 flex-col items-stretch gap-4">
                <div className="flex h-14 grow items-center justify-center rounded-xl px-3 bg-[#242447]">
                  <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                    00
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <p className="text-white text-sm font-normal leading-normal">
                    Hours
                  </p>
                </div>
              </div>
              <div className="flex grow basis-0 flex-col items-stretch gap-4">
                <div className="flex h-14 grow items-center justify-center rounded-xl px-3 bg-[#242447]">
                  <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                    14
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <p className="text-white text-sm font-normal leading-normal">
                    Minutes
                  </p>
                </div>
              </div>
              <div className="flex grow basis-0 flex-col items-stretch gap-4">
                <div className="flex h-14 grow items-center justify-center rounded-xl px-3 bg-[#242447]">
                  <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                    59
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <p className="text-white text-sm font-normal leading-normal">
                    Seconds
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
