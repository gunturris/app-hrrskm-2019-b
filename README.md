keytool -genkey -alias mydomain -keyalg RSA -keystore KeyStore.jks -keysize 2048

Alias : com.rskmd.hris
Firstname Lastname : Guntur
Organitation unit : HRD
Organitation name : RSKMD
City/ Locationation : CILEGON
Province : BANTEN
COuntry : ID
HR1S@rskm

build android --release -- --keystore="KeyStore.jks" --alias="com.rskmd.hris"