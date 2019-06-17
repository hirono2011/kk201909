git/空のディレクトリが消えているんですけど - TOBY SOFT wiki http://tobysoft.net/wiki/index.php?git%2F%B6%F5%A4%CE%A5%C7%A5%A3%A5%EC%A5%AF%A5%C8%A5%EA%A4%AC%BE%C3%A4%A8%A4%C6%A4%A4%A4%EB%A4%F3%A4%C7%A4%B9%A4%B1%A4%C9
find . -type d -empty -not -path './.git*' -exec touch {}\/.gitkeep \;
