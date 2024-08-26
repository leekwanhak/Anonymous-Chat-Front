import "@/styles/globals.css";

import type { AppProps } from "next/app";

//전역상태관리 프로바이더 컴포넌트 참조하기
import GlobalProvider from "@/library/globalContext";

import MainLayout from "@/components/main-layout";
import MyPageLayout from "@/components/mypage-layout";

import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const currentPath: string = router.pathname;
  console.log("currentPath:", currentPath);

  let layoutMode: string = "general";
  if (
    currentPath === "/login" ||
    currentPath === "/regist" ||
    currentPath === "/match" ||
    currentPath === "/chat"
  ) {
    //indexOf 메서드는 문자열에서 특정 문자열('/mypage')이 처음으로 나타나는 위치의 인덱스를 반환합니다. 만약 해당 문자열이 존재하지 않으면 -1을 반환합니다.
    layoutMode = "auth";
  } else if (currentPath.indexOf("/mypage") > -1) {
    layoutMode = "mypage";
  } else {
    layoutMode = "general";
  }

  console.log("layoutMode:", layoutMode);

  const renderLayoutOnPath = () => {
    switch (layoutMode) {
      case "auth":
        return <Component {...pageProps} />;
      case "mypage":
        return (
          <MyPageLayout>
            <Component {...pageProps} />
          </MyPageLayout>
        );
      default:
        return (
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        );
    }
  };

  return <GlobalProvider>{renderLayoutOnPath()}</GlobalProvider>;
}
