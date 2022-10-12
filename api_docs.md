https://forum.iobroker.net/topic/13866/sonnenbatterie

http://[ip_adresse_der_sonnenbatterie]:7979/rest/devices/battery/[parameter]

Einige Werte für [parameter] sind bekannt:

- M03 - POWER_GENERATION - Leistung Erzeugung in Watt
- M04 - POWER_CONSUMPTION - Leistung Verbraucher in Watt
- M05 - STATE_OF_CHARGE - State Of Charge (Ladezustand) bezogen auf die Bruttokapazität in %
- M06 - OPERATING_MODE - Betriebsart
- M07 - PHASE_L1_CONSUMPTION - Verbrauch der Phasen L1
- M08 - PHASE_L2_CONSUMPTION - Verbrauch der Phasen L2
- M09 - PHASE_L3_CONSUMPTION - Verbrauch der Phasen L3
- M10 - PHASE_L1_MAX_CONSUMPTION - max. Verbrauch der Phasen L1
- M11 - PHASE_L2_MAX_CONSUMPTION - max. Verbrauch der Phasen L2
- M12 - PHASE_L3_MAX_CONSUMPTION - max. Verbrauch der Phasen L3
- M34 - DISCHARGE_POWER - Entladeleistung der Sonnenbatterie in Watt
- M35 - CHARGING_POWER - Ladeleistung der Sonnenbatterie in Watt

Betriebsarten (aus M06), alles im Automatikmodus:

- 10 - STANDBY - Standby
- 11 - TRICKLE_CHARGE - Erhaltungsladung (Zwangsladung bei 0% Ladezustand)
- 13 - CHARGING - Laden
- 15 - DISCHARGING - Entladen
- ... - ???
