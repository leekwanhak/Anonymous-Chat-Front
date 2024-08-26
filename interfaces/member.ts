//신규 회원가입 데이터 타입 정의
export interface IEntryMember {
  email: string;
  password: string;
  name: string;
  gender: number;
  department_id: number;
  faculty_id: number;
  // department_name: string;
}

export interface IDepartment {
  department_id: number;
  department_name: string;
  faculty_id: number;
  faculty_name: string;
}

// export enum GenderState {
//   none = 0, //선택
//   man = 1, //남자
//   girl = 2, //여자
// }

//상속
//export interface ILoginMember extends IEntryMember {}
