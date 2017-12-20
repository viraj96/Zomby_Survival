for file in ./data/*Right/*.png; do
  convert "$file" -flop "${file%.png}".png
done