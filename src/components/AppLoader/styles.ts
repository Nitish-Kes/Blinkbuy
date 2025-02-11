import { makeStyles } from '@rneui/themed';
import { Colors } from '../../utils/Colors';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  buttonStyle: {
    backgroundColor: Colors.transparent,
  },
  layerStyle: {
    position: 'absolute',
    backgroundColor: Colors.black,
    height: '100%',
    width:'100%',
    opacity: 0.5,
  },
}));

export default useStyles;