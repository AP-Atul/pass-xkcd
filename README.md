# passme
A simple password generator inspired from xkcd post

## info
hit the star

## post
[xkcd](https://imgs.xkcd.com/comics/password_strength.png)

## usage
1. Generate a simple password
```console
passme
```

2. Help and options
```console
passme -help

Pass me helps you to create passwords as per the xkcd suggestions.
You can use below options to favour some advances

Usage: passme -[options] [value]
    passme -sep -
    passme -n -s -c

Options:

  n      number, include numbers
  s      symbol, include symbols
  c      capital, includes captial
  save   write to encrypted db
  read   get from db
  sep    custom separator, (defaul: ' ') requires a separator string
  help   this help
  h      this help
```

3. Save a password to simple json db (little encryption exists), if site already exists new entry will be added
```console
passme -save <site-name>
```

4. Read saved password, prints array
```console
passme -read <site-name>
# op: ['academy hemoglobin giveaway explode','sainthood-wrongdoing-giddiness-curry']
```

5. For funky sites with upper case, symbol, numbers (just to satisfy them)
```console
passme -n -s -c
# op: Unknown awning hardhat luxurious &@ 59
```