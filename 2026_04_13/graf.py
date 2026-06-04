def read_graph(filename: str) -> tuple[list[list[int]], int]:
    with open(filename, "r", encoding="utf-8") as f:
        lines = [line.strip() for line in f if line.strip()]

    n: int = int(lines[0])
    adjacency_list: list[list[int]] = [[] for _ in range(n)]

    for line in lines[1:]:
        numbers: list[int] = list(map(int, line.split()))
        vertex: int = numbers[0]
        neighbours: list[int] = numbers[1:]
        adjacency_list[vertex] = neighbours

    return adjacency_list, n


def write_neighbours_list(adjacency_list: list[list[int]]) -> None:
    print("--- Lista sąsiedztwa ---")
    for vertex, neighbours in enumerate(adjacency_list):
        if neighbours:
            neighbours_str: str = ", ".join(map(str, neighbours))
        else:
            neighbours_str = "(brak sąsiadów)"
        print(f"Sąsiedzi wierzchołka {vertex}: {neighbours_str}")
    print()


def list_to_matrix(adjacency_list: list[list[int]]) -> list[list[int]]:
    n: int = len(adjacency_list)
    matrix: list[list[int]] = [[0] * n for _ in range(n)]

    for vertex, neighbours in enumerate(adjacency_list):
        for neighbour in neighbours:
            matrix[vertex][neighbour] = 1

    return matrix


def write_matrix(matrix: list[list[int]]) -> None:
    n: int = len(matrix)
    col_width: int = 3

    print("--- Macierz sąsiedztwa ---")

    header: str = " " * col_width + "".join(f"{i:>{col_width}}" for i in range(n))
    print(header)
    print(" " * col_width + "-" * (n * col_width))

    for i, row in enumerate(matrix):
        row_str: str = f"{i:>{col_width - 1}}|" + "".join(f"{val:>{col_width}}" for val in row)
        print(row_str)
    print()


def main() -> None:
    filename: str = "graph.txt"

    adjacency_list, n = read_graph(filename)
    print(f"Wczytano graf o {n} wierzchołkach z pliku '{filename}'.\n")

    write_neighbours_list(adjacency_list)

    matrix = list_to_matrix(adjacency_list)
    write_matrix(matrix)


if __name__ == "__main__":
    main()
