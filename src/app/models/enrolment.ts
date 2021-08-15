import { User } from './user';
import { House } from './house';
import { Role } from './role';
export class Enrolment {
  constructor(public id: string, public amount_paid: string, public created_at: string,
    public expiry_date: string, public currency_code: string, public house_id: string,
    public houses: House, public mastercode: string, public payment_status: string,
    public progress: string, public purchaser: User, public purchaser_id: string, public role_id: string,
    public roles: Role, public start_date: string, public transaction_id: string,
    public updated_at: string,
    public user_id: string,
    public places_alloted: string,
    public users: User) {
  }
} 