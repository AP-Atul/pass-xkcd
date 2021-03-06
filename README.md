# pass-xkcd
A simple password generator inspired from xkcd post

# installation
1. With npx
```
npm i pass-xkcd
```

2. For cli and global use
```
npm i -g pass-xkcd
```

## info
dump before upgrading to next version

## post
[xkcd post](https://imgs.xkcd.com/comics/password_strength.png)

## usage
1. Generate a simple password
```console
pass-xkcd
```

2. Help and options
```console
pass-xkcd -help

Pass xkcd helps you to create passwords as per the xkcd suggestions.
You can use below options to favour some advances

Usage: pass-xkcd -[options] [value]
    pass-xkcd -sep -
    pass-xkcd -n -s -c
    pass-xkcd -save github.com
    pass-xkcd -clear github
    pass-xkcd -read git
    pass-xkcd -add site new-pass
    pass-xkcd -import filepathname

Options:

  n      number, include numbers
  s      symbol, include symbols
  c      capital, includes captial
  save   write to encrypted db
  add    add your existing passwords to manager
  dump   outputs all saved site, passwords
  read   get from db
  import file to import 
  clear  remove passwords with site
  sep    custom separator, (defaul: ' ') requires a separator string
  help   this help
  h      this help
```

3. Save a password to simple json db (little encryption exists), if site already exists new entry will be added
```console
pass-xkcd -save <site-name>
```

4. Read saved password, prints array
```console
pass-xkcd -read <site-name>
# op: ['academy hemoglobin giveaway explode','sainthood-wrongdoing-giddiness-curry']
```

5. For funky sites with upper case, symbol, numbers (just to satisfy them)
```console
pass-xkcd -n -s -c
# op: Unknown awning hardhat luxurious &@ 59
```
