import React from "react"
import { useState, useEffect } from "react"
import { Text, View, TouchableOpacity, StyleSheet, Modal } from "react-native"
import Svg, { Path } from "react-native-svg"
import { styles } from "../../styles"
const HeaderAlarmGroup = ({
  groupName,
  onPressAdd,
  onDeleteGroup,
  onDeactivateAllAlarms,
}) => {
  const [isConfirmDeleteModalVisible, setIsConfirmDeleteModalVisible] =
    useState(false)

  const handleConfirmDelete = () => {
    onDeleteGroup()
    setIsConfirmDeleteModalVisible(false)
  }

  return (
    <View style={styles.mainHeader}>
      <View style={styles.mainHeaderContent}>
        <Text style={styles.h6}>{groupName}</Text>
        <View style={styles.svgs}>
          <TouchableOpacity
            onPress={() => setIsConfirmDeleteModalVisible(true)}
          >
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <Path
                d="M6 7H5V20C5 20.5304 5.21071 21.0391 5.58579 21.4142C5.96086 21.7893 6.46957 22 7 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20V7H6ZM16.618 4L15 2H9L7.382 4H3V6H21V4H16.618Z"
                fill="#1B1D1F"
              />
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressAdd}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 4C7.12103 4 3.00003 8.121 3.00003 13C3.00003 17.879 7.12103 22 12 22C16.879 22 21 17.879 21 13C21 8.121 16.879 4 12 4ZM16 14H13V17H11V14H8.00003V12H11V9H13V12H16V14ZM17.284 3.707L18.696 2.291L21.706 5.291L20.293 6.708L17.284 3.707ZM5.28203 2.294L6.70003 3.706L3.71003 6.706L2.29303 5.293L5.28203 2.294Z"
                fill="#1B1D1F"
              />
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeactivateAllAlarms}>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <Path
                d="M17.284 3.707L18.696 2.291L21.706 5.291L20.293 6.708L17.284 3.707ZM6.69798 3.707L3.70798 6.706L2.28998 5.294L5.27998 2.294L6.69798 3.707ZM12 4C7.12198 4 2.99998 8.121 2.99998 13C2.99998 17.879 7.12198 22 12 22C16.879 22 21 17.879 21 13C21 8.121 16.879 4 12 4ZM16 17H8.13098L12.131 11H7.99998V9H15.868L14.833 10.554L14.832 10.555L11.869 15H16V17Z"
                fill="#1B1D1F"
              />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isConfirmDeleteModalVisible}
        onRequestClose={() => setIsConfirmDeleteModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Confirma a exclusão do grupo?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => setIsConfirmDeleteModalVisible(false)}
              >
                <Text style={styles.buttonClose}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonDelete}
                onPress={handleConfirmDelete}
              >
                <Text style={styles.buttonCreate}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const stylesIn = StyleSheet.create({})

export default HeaderAlarmGroup
