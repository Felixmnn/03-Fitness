import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export const excel = async ({workouts,plans}) => {

    const data = [
      { Name: 'Max', Alter: 28, Stadt: 'Berlin' },
      { Name: 'Anna', Alter: 25, Stadt: 'Hamburg' },
      { Name: 'Tom', Alter: 30, Stadt: 'München' },
    ];
  
    // Konvertiere Daten in Excel
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
    // Schreibe die Excel-Daten in eine Base64-codierte Datei
    const excelOutput = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });
  
    // Speichere die Datei auf dem Gerät
    const fileUri = `${FileSystem.documentDirectory}example.xlsx`;
    await FileSystem.writeAsStringAsync(fileUri, excelOutput, {
      encoding: FileSystem.EncodingType.Base64,
    });
  
    console.log(`Excel-Datei gespeichert unter: ${fileUri}`);
  
    // Überprüfe, ob das Teilen möglich ist
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri, {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        dialogTitle: 'Teile deine Excel-Datei',
      });
    } else {
      Alert.alert('Teilen nicht möglich', 'Sharing wird auf diesem Gerät nicht unterstützt.');
    }
  };