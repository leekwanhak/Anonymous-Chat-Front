export interface MatchPartnerProps {
  member_id: number;
  email: string;
  member_password: string;
  name: string;
  gender: number;
  department: string;
  active_state_code: number;
  last_login: Date; //string 쓸지 date 쓸지 고민
  entry_type_code: number;
  profile_img_path: string;
  connection_id: string;
  telephone: string;
  ip_address: string;
  use_state_code: number;
  birth_date: string;
  entry_date: Date;
  edit_date: Date;
  edit_member_id: string;
}
