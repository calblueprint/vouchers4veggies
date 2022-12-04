// import React from 'react';
// import { Pressable, Text, View, TextInput } from 'react-native';
// import { AntDesign } from '@expo/vector-icons';
// import styles from './styles';

// type FilterModalProps = {
//   refRBSheet: any;
//   minDate: any;
//   setMinDate: any;
//   showMin: any;
//   setShowMin: any;
//   maxDate: any;
//   setMaxDate: any;
//   showMax: any;
//   setShowMax: any;
//   familyMembers: any;
//   memberSelect: any;
//   setMemberSelect: any;
//   typeFilter: any;
//   setTypeFilter: any;
//   handleReset: any;
//   handleApply: any;
//   forFamily: any;
// };
// export default function FilterModal({
//   refRBSheet,
//   minDate,
//   setMinDate,
//   showMin,
//   setShowMin,
//   maxDate,
//   setMaxDate,
//   showMax,
//   setShowMax,
//   familyMembers,
//   memberSelect,
//   setMemberSelect,
//   typeFilter,
//   setTypeFilter,
//   handleReset,
//   handleApply,
//   forFamily,
// }: FilterModalProps) {
//   return (
//     <>
//       <Pressable style={styles.modalIconContainer} onPress={handleApply}>
//         <Text style={styles.closeText}>Close</Text>
//       </Pressable>
//       <Text style={styles.modalTitle}>Filter Transactions</Text>
//       <View style={styles.innerModal}>
//         <View style={styles.filtersContainer}>
//           <View style={styles.filterGroup}>
//             <View style={styles.withClear}>
//               <Text style={styles.filterBtnText}>Filter by date</Text>
//               <Text
//                 style={[
//                   styles.closeText,
//                   minDate !== null || maxDate !== null
//                     ? { color: '#526DC2' }
//                     : { color: '#A9A9A9' },
//                 ]}
//                 onPress={() => {
//                   setMinDate(null);
//                   setMaxDate(null);
//                 }}
//               >
//                 Clear
//               </Text>
//             </View>
//             <View style={styles.rowFlex}>
//               <Pressable
//                 onPress={() => setShowMin(true)}
//                 style={[
//                   styles.dateInput,
//                   minDate !== null
//                     ? styles.selectedInput
//                     : styles.unselectedInput,
//                 ]}
//               >
//                 <Text
//                   style={[
//                     styles.dateText,
//                     minDate !== null
//                       ? { color: '#525454' }
//                       : { color: '#A9A9A9' },
//                   ]}
//                 >
//                   {minDate === null
//                     ? 'MM/DD/YYYY'
//                     : `${
//                         minDate.getMonth() + 1
//                       }/${minDate.getDate()}/${minDate.getFullYear()}`}
//                 </Text>
//               </Pressable>
//               <Text style={styles.to}>to</Text>
//               <Pressable
//                 onPress={() => setShowMax(true)}
//                 style={[
//                   styles.dateInput,
//                   maxDate !== null
//                     ? styles.selectedInput
//                     : styles.unselectedInput,
//                 ]}
//               >
//                 <Text
//                   style={[
//                     styles.dateText,
//                     maxDate !== null
//                       ? { color: '#525454' }
//                       : { color: '#A9A9A9' },
//                   ]}
//                 >
//                   {maxDate === null
//                     ? 'MM/DD/YYYY'
//                     : `${
//                         maxDate.getMonth() + 1
//                       }/${maxDate.getDate()}/${maxDate.getFullYear()}`}
//                 </Text>
//               </Pressable>
//             </View>
//           </View>
//           {forFamily && (
//             <View style={styles.filterGroup}>
//               <View style={styles.withClear}>
//                 <Text style={styles.filterBtnText}>
//                   Filter by family member
//                 </Text>
//                 <Text
//                   style={[
//                     styles.closeText,
//                     !memberSelect.includes('Any Member')
//                       ? { color: '#526DC2' }
//                       : { color: '#A9A9A9' },
//                   ]}
//                   onPress={() => {
//                     setMemberSelect(['Any Member']);
//                   }}
//                 >
//                   Clear
//                 </Text>
//               </View>
//               <View style={styles.rowFlex}>
//                 {familyMembers.map((name: any) => {
//                   const selected = memberSelect.includes(name);
//                   return (
//                     <Pressable
//                       style={[
//                         styles.memberBtn,
//                         selected
//                           ? styles.selectedInput
//                           : styles.unselectedInput,
//                       ]}
//                       onPress={() => {
//                         if (selected) {
//                           const newSelected = memberSelect.filter(
//                             (val: any) => val !== name,
//                           );
//                           setMemberSelect(newSelected);
//                         } else if (name === 'Any Member') {
//                           const newSelected = ['Any Member'];
//                           setMemberSelect(newSelected);
//                         } else if (memberSelect.includes('Any Member')) {
//                           const newSelected = memberSelect.filter(
//                             (val: any) => val !== 'Any Member',
//                           );
//                           newSelected.push(name);
//                           setMemberSelect(newSelected);
//                         } else {
//                           const newSelected = [...memberSelect, name];
//                           setMemberSelect(newSelected);
//                         }
//                       }}
//                       key={name}
//                     >
//                       <Text
//                         style={[
//                           styles.filterBtnText,
//                           selected
//                             ? { color: '#525454' }
//                             : { color: '#A9A9A9' },
//                         ]}
//                       >
//                         {name}
//                       </Text>
//                       {selected && (
//                         <View
//                           style={{ position: 'absolute', right: 12, top: 10 }}
//                         >
//                           <AntDesign type="basic_check" />
//                         </View>
//                       )}
//                     </Pressable>
//                   );
//                 })}
//               </View>
//             </View>
//           )}
//           <View style={styles.filterGroup}>
//             <Text style={[styles.filterBtnText, { marginBottom: 5 }]}>
//               Filter by transaction type
//             </Text>
//             <Pressable
//               style={[
//                 styles.filterBtn,
//                 typeFilter === 1
//                   ? styles.selectedInput
//                   : styles.unselectedInput,
//               ]}
//               onPress={() => setTypeFilter(1)}
//             >
//               <Text
//                 style={[
//                   styles.filterBtnText,
//                   typeFilter === 1
//                     ? { color: '#525454' }
//                     : { color: '#A9A9A9' },
//                 ]}
//               >
//                 Any transaction
//               </Text>
//               {typeFilter === 1 && (
//                 <View style={{ position: 'absolute', right: 12, top: 10 }}>
//                   <AntDesign type="basic_check" />
//                 </View>
//               )}
//             </Pressable>
//             <Pressable
//               style={[
//                 styles.filterBtn,
//                 typeFilter === 2
//                   ? styles.selectedInput
//                   : styles.unselectedInput,
//               ]}
//               onPress={() => setTypeFilter(2)}
//             >
//               <Text
//                 style={[
//                   styles.filterBtnText,
//                   typeFilter === 2
//                     ? { color: '#525454' }
//                     : { color: '#A9A9A9' },
//                 ]}
//               >
//                 Earnings
//               </Text>
//               {typeFilter === 2 && (
//                 <View style={{ position: 'absolute', right: 12, top: 10 }}>
//                   <AntDesign type="basic_check" />
//                 </View>
//               )}
//             </Pressable>
//             <Pressable
//               style={[
//                 styles.filterBtn,
//                 typeFilter === 3
//                   ? styles.selectedInput
//                   : styles.unselectedInput,
//               ]}
//               onPress={() => setTypeFilter(3)}
//             >
//               <Text
//                 style={[
//                   styles.filterBtnText,
//                   typeFilter === 3
//                     ? { color: '#525454' }
//                     : { color: '#A9A9A9' },
//                 ]}
//               >
//                 Expirations
//               </Text>
//               {typeFilter === 3 && (
//                 <View style={{ position: 'absolute', right: 12, top: 10 }}>
//                   <AntDesign type="basic_check" />
//                 </View>
//               )}
//             </Pressable>
//           </View>
//         </View>
//       </View>
//       <View style={styles.resetApplyContainer}>
//         <Pressable style={styles.resetApplyButton} onPress={handleReset}>
//           {/* <Text style={[globalStyles.overline1, { color: '#272929' }]}> */}
//           <Text>Reset</Text>
//         </Pressable>
//         <Pressable
//           style={[
//             styles.resetApplyButton,
//             { backgroundColor: '#253C85', borderColor: '#253C85' },
//           ]}
//           onPress={handleApply}
//         >
//           {/* <Text style={[globalStyles.overline1, { color: '#FFFFFF' }]}> */}
//           <Text>Apply</Text>
//         </Pressable>
//       </View>
//     </>
//   );
// }
