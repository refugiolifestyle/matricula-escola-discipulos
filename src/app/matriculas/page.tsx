"use client"

import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAKXJbkOvAxYQ5aSFXBCEySSS1ZCyPvzpY",
  authDomain: "modulo-4250a.firebaseapp.com",
  projectId: "modulo-4250a",
  storageBucket: "modulo-4250a.appspot.com",
  messagingSenderId: "28809216844",
  appId: "1:28809216844:web:80331f0bc03cf07bc185e9",
  measurementId: "G-H6BZ7VJ5QK"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)

import { ModeToggle } from "@/components/mode-toggle";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Matricula = {
  modulo: string;
  rede: string;
  celula: string;
  nome: string;
  telefone: string;
}

import celulas from "@/lib/celulas.json";

export default function Martriculas() {
  const [matriculas, setMatriculas] = useState<Matricula[]>([])
  const [page, setPage] = useState<number>(1)
  const [modulo, setModulo] = useState<string | null>(null)
  const [rede, setRede] = useState<string | null>(null)
  const [celula, setCelula] = useState<string | null>(null)

  useEffect(() => {
    let query = ref(database, 'matriculas')
    let unsubs = onValue(query, snapshot => {
      let result = snapshot.val()
      setMatriculas(Object.values(result))
    })

    return () => unsubs()
  }, [])


  useEffect(() => {
    setPage(1)
  }, [modulo, rede, celula])

  let matriculasFiltered = matriculas
  matriculasFiltered = matriculasFiltered.filter(row => modulo ? row.modulo === modulo : true)
  matriculasFiltered = matriculasFiltered.filter(row => rede ? row.rede === rede : true)
  matriculasFiltered = matriculasFiltered.filter(row => celula ? row.celula === celula : true)

  const sorter = new Intl.Collator('pt-BR', { usage: "sort", numeric: true })
  matriculasFiltered.sort((a, b) => sorter.compare(`${a.rede}-${a.celula}-${a.nome}-${a.modulo}`, `${b.rede}-${b.celula}-${b.nome}-${b.modulo}`))

  let pagesLength = matriculasFiltered.length ? Math.ceil(matriculasFiltered.length / 10) : 0

  return (
    <main className="w-full max-w-7xl mx-auto p-6">
      <img
        src="/logo.png"
        alt="Imagem escrita Escola de discipulos"
        className="w-64 mb-6 mx-auto" />

      <Card className="w-full h-fit">
        <CardHeader>
          <CardTitle>Listagem</CardTitle>
          <div className="flex flex-row gap-4">
            <Select value={modulo!} onValueChange={setModulo}>
              <SelectTrigger
                id="rede"
                className="items-start text-zinc-500 [&_[data-description]]:hidden">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null as any}>Todos as módulos</SelectItem>
                <SelectItem value="Módulo 2">Módulo 2</SelectItem>
                <SelectItem value="Módulo 3">Módulo 3</SelectItem>
              </SelectContent>
            </Select>
            <Select value={rede!} onValueChange={setRede}>
              <SelectTrigger
                id="rede"
                className="items-start text-zinc-500 [&_[data-description]]:hidden">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null as any}>Todas as redes</SelectItem>
                <SelectItem value="Rede 1">Rede 1</SelectItem>
                <SelectItem value="Rede 2">Rede 2</SelectItem>
                <SelectItem value="Rede 3">Rede 3</SelectItem>
                <SelectItem value="Rede 4">Rede 4</SelectItem>
                <SelectItem value="Rede 5">Rede 5</SelectItem>
                <SelectItem value="Rede 6">Rede 6</SelectItem>
                <SelectItem value="Rede 7">Rede 7</SelectItem>
                <SelectItem value="Rede 8">Rede 8</SelectItem>
                <SelectItem value="Rede 9">Rede 9</SelectItem>
                <SelectItem value="Rede 10">Rede 10</SelectItem>
                <SelectItem value="Rede 11">Rede 11</SelectItem>
                <SelectItem value="Rede 12">Rede 12</SelectItem>
                <SelectItem value="Rede 13">Rede 13</SelectItem>
                <SelectItem value="Rede 14">Rede 14</SelectItem>
                <SelectItem value="Rede 16">Rede 16</SelectItem>
                <SelectItem value="Rede 17">Rede 17</SelectItem>
                <SelectItem value="Rede 18">Rede 18</SelectItem>
                <SelectItem value="Rede 19">Rede 19</SelectItem>
              </SelectContent>
            </Select>
            <Select value={celula!} onValueChange={setCelula}>
              <SelectTrigger
                id="celula"
                className="items-start text-zinc-500 [&_[data-description]]:hidden">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null as any}>Todas as células</SelectItem>
                {
                  (
                    !rede
                      ? celulas
                      : celulas.filter(f => f.rede === rede)
                  ).map(s => (
                    <SelectItem key={`${s.rede}${s.celula}`} value={s.celula}>{s.celula}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Rede</TableHead>
                <TableHead>Célula</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Módulo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                matriculasFiltered
                  .slice((page - 1) * 10, page * 10 > matriculasFiltered.length ? matriculasFiltered.length : page * 10)
                  .map((r, i) => (
                    <TableRow key={i}>
                      <TableCell>{r.nome}</TableCell>
                      <TableCell>{r.rede}</TableCell>
                      <TableCell>{r.celula}</TableCell>
                      <TableCell style={{ display: "flex", flexDirection: 'row', alignItems: "center", gap: 6 }}>
                        <Phone size={16} />
                        <a href={`tel:${r.telefone}`}>{r.telefone}</a>
                      </TableCell>
                      <TableCell>{r.modulo}</TableCell>
                    </TableRow>
                  ))
              }
            </TableBody>
          </Table>
          {
            matriculasFiltered.length
              ? <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-4">
                <p className="text-sm text-gray-700">
                  Mostrando de <span className="font-medium">{((page - 1) * 10) + 1}</span>{' '}
                  até{' '}
                  <span className="font-medium">{page * 10 > matriculasFiltered.length ? matriculasFiltered.length : page * 10}</span>{' '}
                  de{' '}
                  <span className="font-medium">{matriculasFiltered.length}</span> linhas
                </p>
                <nav aria-label="Pagination" className="isolate inline-flex -space-x-px">
                  <a
                    onClick={() => setPage(page == 1 ? 1 : page - 1)}
                    href="#"
                    className={`relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 gap-2 ${page === 1 ? 'pointer-events-none cursor-not-allowed ' : ''}`}
                  >
                    <span className="sr-only">Anterior</span>
                    <ArrowLeft aria-hidden="true" className="h-5 w-5" />
                    Anterior
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    Página {page} de {pagesLength}
                  </a>
                  <a
                    onClick={() => setPage(page + 1 > pagesLength ? pagesLength : page + 1)}
                    href="#"
                    className={`relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 gap-2 ${page === pagesLength ? 'pointer-events-none cursor-not-allowed ' : ''}`}
                  >
                    <span className="sr-only">Proxima</span>
                    Proxima
                    <ArrowRight aria-hidden="true" className="h-5 w-5" />
                  </a>
                </nav>
              </div>
              : null
          }
        </CardContent>
      </Card>
      <ModeToggle />
    </main>
  )
}
