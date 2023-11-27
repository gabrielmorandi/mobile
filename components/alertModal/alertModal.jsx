import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import styles from "../../styles.js";

export async function showModal(title, message, onClose) {
  const [modalVisible, setModalVisible] = useState(true);

  const closeModal = () => {
    setModalVisible(false);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
        >
          <Text>{title}</Text>
          <Text>{message}</Text>
          <TouchableOpacity onPress={closeModal}>
            <Text>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
