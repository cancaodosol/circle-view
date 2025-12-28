#!/usr/bin/env python3
import csv
from pathlib import Path
import sys

def main() -> int:
    csv_path = Path("titles.csv")
    if len(sys.argv) > 1:
        csv_path = Path(sys.argv[1])

    if not csv_path.exists():
        print(f"File not found: {csv_path}", file=sys.stderr)
        return 1

    rows = []
    with csv_path.open(newline="", encoding="utf-8") as f:
        reader = csv.reader(f)
        first = next(reader, None)
        if first is None:
            return 0

        if len(first) >= 3 and first[0] == "タイトル" and first[1] == "画像URL":
            header = first
        else:
            header = None
            if len(first) >= 3:
                rows.append(first)

        for row in reader:
            if len(row) >= 3:
                rows.append(row)

    lines = ["const DATA = ["]
    for title, url, link, *_ in rows:
        lines.append("  {")
        lines.append(f"    title: {title!r},")
        lines.append(f"    url: {url!r},")
        lines.append(f"    link: {link!r},")
        lines.append("  },")
    lines.append("];\n")

    sys.stdout.write("\n".join(lines))
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
