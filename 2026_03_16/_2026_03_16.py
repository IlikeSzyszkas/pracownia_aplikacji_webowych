def czySlowo(slowo):
    for i in range(len(slowo)):
        for j in range(i + 1, len(slowo)):
            if abs(ord(slowo[i]) - ord(slowo[j])) > 10:
                return False
    return True

with open("sygnaly.txt", "r", encoding="utf-8") as plik:
    slowa = plik.read().split()

wynik = ""
for i in range(39, len(slowa), 40):
    wynik += slowa[i][9]

najlepszeSlowo = ""
maxRoznych = 0

for slowo in slowa:
    roznych = len(set(slowo))
    if roznych > maxRoznych:
        maxRoznych = roznych
        najlepszeSlowo = slowo

with open ("wyniki4.txt", "a", encoding="utf-8") as plikWynik:
    plikWynik.write("z 4.1" + "\n" + wynik + "\n" + "z 4.2" + "\n" + str(najlepszeSlowo) + " " + str(maxRoznych) + "\n" + "z 4.3" + "\n")
    for slowo in slowa:
        if czySlowo(slowo):
            plikWynik.write(slowo + "\n")

