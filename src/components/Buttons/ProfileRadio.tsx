// import styles from './ProfileRadio.module.scss';
// import ChangeRadioBtn from '../../components/Buttons/ChangeRadioBtn';

// interface IProfileRadio {
//   name: string;
//   tags: string;
//   id: number;
//   checkedId: number;
//   onRadioChange: () => void;
// }
// const ProfileRadio = ({
//   name,
//   tags,
//   id,
//   checkedId,
//   onRadioChange,
// }: IProfileRadio) => {
//   return (
//     <div>
//       <label
//         className={`${styles.chatProfile} ${
//           checkedId === (id + 1) % 3 ? '' : styles.uncheckedLabel
//         }`}
//       >
//         <div>
//           <Chichi48 />
//           <span className={styles.name}>치치</span>
//         </div>
//         <div className={styles.tags}>
//           <span>#활발</span>
//           <span>#호기심 가득</span>
//           <ChangeRadioBtn
//             id={(id + 1) % 3}
//             onChange={handleRadioChange}
//           />
//         </div>
//       </label>
//     </div>
//   );
// };

// export default ProfileRadio;

export const val = 1;
