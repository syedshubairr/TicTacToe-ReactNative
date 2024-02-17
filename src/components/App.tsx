import React, {useState} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {Icons} from './icons';
import {styles} from './styles';
function App(): React.JSX.Element {
  const [isCross, setCross] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>('');
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9));

  const gameReload = () => {
    setCross(false);
    setWinner('');
    setGameState(new Array(9).fill('empty', 0, 9));
  };
  const checkIsWinner = () => {
    //  checking  winner of the game
    if (
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      setWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      setWinner(`${gameState[3]} won the game! 🥳`);
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setWinner(`${gameState[6]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      setWinner(`${gameState[1]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      setWinner(`${gameState[2]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setWinner(`${gameState[2]} won the game! 🥳`);
    } else if (!gameState.includes('empty', 0)) {
      setWinner('Draw game... ⌛️');
    }
  };

  const onChangeItem = (itemNumber: number) => {
    if (winner) {
      return Snackbar.show({
        text: winner,
        backgroundColor: '#000000',
        textColor: '#FFFFFF',
      });
    }

    if (gameState[itemNumber] === 'empty') {
      gameState[itemNumber] = isCross ? 'cross' : 'circle';
      setCross(!isCross);
    } else {
      return Snackbar.show({
        text: 'Position is already filled',
        backgroundColor: 'red',
        textColor: '#FFF',
      });
    }

    checkIsWinner();
  };
  return (
    <SafeAreaView>
      <StatusBar />
      {winner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{winner}</Text>
        </View>
      ) : (
        <View
          style={[
            styles.playerInfo,
            isCross ? styles.playerX : styles.playerO,
          ]}>
          <Text style={styles.gameTurnTxt}>
            {isCross ? 'X' : 'O'} Player's turn
          </Text>
        </View>
      )}
      {/* Game Grid */}
      <FlatList
        numColumns={3}
        data={gameState}
        renderItem={({item, index}) => (
          <Pressable
            key={index}
            style={styles.card}
            onPress={() => onChangeItem(index)}>
            <Icons name={item} />
          </Pressable>
        )}
        style={styles.grid}
      />
      <Pressable style={styles.gameBtn} onPress={gameReload}>
        <Text style={styles.gameBtnText}>
          {winner ? 'Start a new Game' : 'Reload the game'}{' '}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default App;
