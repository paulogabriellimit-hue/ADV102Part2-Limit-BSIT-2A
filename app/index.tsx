import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";

type Cell = {
  row: number;
  col: number;
  bomb: boolean;
  number: number;
};

const GRID_SIZE = 8;

export default function App() {
  const [bombCount, setBombCount] = useState<number>(10);
  const [board, setBoard] = useState<Cell[][]>([]);

  useEffect(() => {
    generateBoard();
  }, []);

  const createEmptyBoard = (): Cell[][] => {
    const newBoard: Cell[][] = [];

    for (let row = 0; row < GRID_SIZE; row++) {
      const currentRow: Cell[] = [];

      for (let col = 0; col < GRID_SIZE; col++) {
        currentRow.push({
          row,
          col,
          bomb: false,
          number: 0,
        });
      }

      newBoard.push(currentRow);
    }

    return newBoard;
  };

  const placeBombs = (newBoard: Cell[][]): Cell[][] => {
    let bombsPlaced = 0;

    while (bombsPlaced < bombCount) {
      const randomRow = Math.floor(Math.random() * GRID_SIZE);
      const randomCol = Math.floor(Math.random() * GRID_SIZE);

      if (!newBoard[randomRow][randomCol].bomb) {
        newBoard[randomRow][randomCol].bomb = true;
        bombsPlaced++;
      }
    }

    return newBoard;
  };

  const calculateNumbers = (newBoard: Cell[][]): Cell[][] => {
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (newBoard[row][col].bomb) continue;

        let count = 0;

        directions.forEach(([dx, dy]) => {
          const newRow = row + dx;
          const newCol = col + dy;

          if (
            newRow >= 0 &&
            newRow < GRID_SIZE &&
            newCol >= 0 &&
            newCol < GRID_SIZE &&
            newBoard[newRow][newCol].bomb
          ) {
            count++;
          }
        });

        newBoard[row][col].number = count;
      }
    }

    return newBoard;
  };

  const generateBoard = () => {
    let newBoard = createEmptyBoard();
    newBoard = placeBombs(newBoard);
    newBoard = calculateNumbers(newBoard);

    setBoard(newBoard);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Minesweeper Board</Text>

        <View style={styles.controls}>
          <Text style={styles.label}>Bombs:</Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={bombCount.toString()}
            onChangeText={(text) =>
              setBombCount(Number(text) || 0)
            }
          />

          <TouchableOpacity
            style={styles.button}
            onPress={generateBoard}
          >
            <Text style={styles.buttonText}>Regenerate</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.board}>
          {board.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, colIndex) => (
                <View
                  key={colIndex}
                  style={[
                    styles.cell,
                    cell.bomb && styles.bombCell,
                  ]}
                >
                  <Text style={styles.cellText}>
                    {cell.bomb ? "💣" : cell.number}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  content: {
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  controls: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  label: {
    fontSize: 18,
    marginRight: 10,
  },

  input: {
    width: 60,
    height: 40,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    backgroundColor: "#fff",
    textAlign: "center",
    marginRight: 10,
  },

  button: {
    backgroundColor: "#007BFF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  board: {
    borderWidth: 2,
    borderColor: "#333",
  },

  row: {
    flexDirection: "row",
  },

  cell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#999",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
  },

  bombCell: {
    backgroundColor: "#ff4d4d",
  },

  cellText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
