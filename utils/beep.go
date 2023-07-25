package utils

import (
	"log"

	"github.com/gen2brain/beeep"
)

func PlayBeep() {
	er := beeep.Beep(beeep.DefaultFreq, beeep.DefaultDuration)
	if er != nil {
		log.Print("error in PlayBeep :")
		log.Println(er)
	}
}

func DisplayNotification(title string) {
	err := beeep.Notify("Reminder", title, "./cross.svg")
	if err != nil {
		log.Print("error in DisplayNotification :")
		log.Println(err)
	}
}
