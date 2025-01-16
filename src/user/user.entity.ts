import { Otp } from 'src/otp';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
  @Column()
  status: string;

  @OneToMany(() => Otp, (otp) => otp.user)
  otps?: Otp[];
}
