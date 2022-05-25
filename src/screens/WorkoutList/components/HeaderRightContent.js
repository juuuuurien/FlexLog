import React, { useState } from 'react';
import { View } from 'react-native';
import { IconButton, Menu, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const HeaderRightContent = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigation = useNavigation();

  const open = () => {
    setMenuOpen(!menuOpen);
  };

  const close = () => {
    setMenuOpen(false);
  };

  const handleNavigation = () => {
    close();
    navigation.navigate('Settings')
  }

  return (
    <>
      <Menu
        visible={menuOpen}
        onDismiss={close}
        anchor={<IconButton icon="account-circle" size={26} onPress={open} />}>
        <Menu.Item icon='cog' onPress={handleNavigation} title="Settings" />
      </Menu>
    </>
  );
};

export default HeaderRightContent;
