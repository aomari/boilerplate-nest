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

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth?: Date;

  @Column({ nullable: true })
  profilePicture?: string;
}
