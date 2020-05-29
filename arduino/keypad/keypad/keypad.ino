#include <Keypad.h>
#include <SPI.h>
#include <MFRC522.h>

MFRC522 mfrc522(53, 46);

char a = ' ';
char b = ' ';
char c = ' ';

const byte ROWS = 4;              //Cetirite redici na Keypad
const byte COLS = 4;              //Cetirite koloni na keypad

char keys[ROWS][COLS] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};

byte rowPins[ROWS] = {
    28, 30, 32, 34
};                                // Pinovi na redicite
byte colPins[COLS] = {
    36, 38, 40, 42
};                                // Pinovo na kolonite
byte rfidPins[5] = {
    53, 52, 50, 48, 46  
};

long vreme = 300000;               // Vreme vo iznos od 5 minuti (60 * 5 * 1000)
bool selektirano = false;          // Dali se selektirani site 3 parametri
char *rfids[32];                     // Niza od RFID's na ucenicite.


Keypad keypad = Keypad(           // Keypad instanca - construcot prifaka 5 parametri:
    makeKeymap(keys),             //                                                   Niza na kopcinja (definiranje na poziciite na kopcinata)
    rowPins,                      //                                                   Broj na pinovi vo redica
    colPins,                      //                                                   Broj na pinovi vo kolona
    ROWS,                         //                                                   Broj na redici
    COLS                          //                                                   Broj na koloni
);

void setup(){
  Serial.begin(9600);
  SPI.begin(); 
  mfrc522.PCD_Init(); 
}


void vnesiKarakter(char key) {
  Serial.println(key);
  if (a == ' '){
    a = key;
  } else if (b == ' ') {
    b = key;
  } else {
    c = key;
    selektirano = true;

  }
  
}

void loop(){
  
      if(selektirano){
          vreme -= 50;                    // Namali go vremeto za 0.5 sekundi (delay time)
          //Serial.println(vreme);
          if (mfrc522.PICC_ReadCardSerial() || mfrc522.PICC_IsNewCardPresent()) 
          {
              Serial.print("UID tag :");
              String content= "";
              byte letter;
              for (byte i = 0; i < mfrc522.uid.size; i++) 
              {
                 Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
                 Serial.print(mfrc522.uid.uidByte[i], HEX);
                 content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
                 content.concat(String(mfrc522.uid.uidByte[i], HEX));
              }
              Serial.println();
              Serial.print("Message : ");
              content.toUpperCase();
          }
          
      } else {
        char key = keypad.getKey();       // Prezemanje na pritisnatoto kopce
        if(key){
          vnesiKarakter(key);
        }
      }

    if (vreme == 0) {
      return;
    }

    delay(50);
}
