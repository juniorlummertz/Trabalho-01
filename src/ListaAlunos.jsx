function ListaAlunos() {
  const alunos = ["Junior", "Maria", "Carlos", "Ana", "Victor", "Matheus", "rodrigo", "Micaele", "Vitor Roque",
    "Lucas", "Bruno", "Bianka", "Talita", "Ricardo",
  ];

  return (
    <div>
      <h3>Lista de Alunos:</h3>
      <ul>
        {alunos.map((aluno, index) => (
          <li key={index}>{aluno}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListaAlunos;
