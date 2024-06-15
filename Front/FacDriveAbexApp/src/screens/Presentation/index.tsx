import { useNavigation } from '@react-navigation/native';
import FacDriveLogoIcon from '../../assets/images/fac-drive-logo.png';
import { Button } from '../../components/Button/index.tsx';
import * as Styles from './styles.ts';

export const Presentation = () => {
  const { navigate } = useNavigation();

  return (
    <Styles.PresentationContainer>
      <Styles.AppLogo resizeMode="contain" source={FacDriveLogoIcon} />

      <Styles.TextsView>
        <Styles.TextH1>Bem vindo ao{'\n'}FacDrive</Styles.TextH1>
        <Styles.TextH3>
          FacDrive o seu APP de carronas para faculdade {'\n'}Para proceguir
          crie uma conta ou faça login!!
        </Styles.TextH3>
      </Styles.TextsView>

      <Styles.ButtonsView>
        <Button
          backGroundColor="#002039"
          label="Login"
          labelColor="white"
          onPress={() => navigate('login')}
        />
        <Button
          backGroundColor="#4ccbf8"
          label="Cadastrar"
          labelColor="black"
          onPress={() => navigate('email-and-password')}
        />
      </Styles.ButtonsView>
    </Styles.PresentationContainer>
  );
};
