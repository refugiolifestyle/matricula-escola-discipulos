"use client"

import { initializeApp } from "firebase/app";
import { getDatabase, push, ref } from "firebase/database";

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

import { ArrowRight, Check, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useState } from "react"
import { ModeToggle } from "@/components/mode-toggle";

type Matricula = {
  modulo: string;
  rede: string;
  celula: string;
  nome: string;
  telefone: string;
}

import celulas from "@/lib/celulas.json"

export default function Home() {
  const [enviando, setEnvio] = useState<boolean>(false)
  const [matriculas, setMatriculas] = useState<Matricula[]>([])
  const [modulo, setModulo] = useState<string>()
  const [rede, setRede] = useState<string>()
  const [celula, setCelula] = useState<string>()
  const [nome, setNome] = useState<string>()
  const [telefone, setTelefone] = useState<string>()

  function onAdd() {
    if (
      !modulo ||
      !rede ||
      !celula ||
      !nome ||
      !telefone
    ) {
      alert("Campo obrigatório")
      return
    }

    if (nome.split(' ').length < 2) {
      alert("Informe o nome completo")
      return
    }

    if (/[^\d]+/.test(telefone)) {
      alert("Informe somente os números no telefone")
      return
    }

    if (telefone.length < 8 || telefone.length > 11) {
      alert("Informe um telefone válido")
      return
    }

    setMatriculas(old => old.concat([{ modulo, rede, celula, nome, telefone } as Matricula]))
    setNome('')
    setTelefone('')
    setModulo('')
    setRede('')
    setCelula('')
  }

  function onRemove(index: number) {
    setMatriculas(old => old.filter((_, oIndex) => index !== oIndex))
  }

  async function onFinish() {
    setEnvio(true)

    for (let matricula of matriculas) {
      await push(ref(database, 'matriculas'), matricula)
    }

    alert("Matriculas salvas com sucesso")

    setMatriculas([])
    setModulo('')
    setRede('')
    setCelula('')
    setNome('')
    setTelefone('')
    setEnvio(false)
  }

  return (
    <main className="w-full max-w-7xl mx-auto p-6">
      <img
        src="/logo.png"
        alt="Imagem escrita Escola de discipulos"
        className="w-64 mb-6 mx-auto" />
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="w-full md:w-2/6 h-fit">
          <CardHeader>
            <CardTitle>Formulário</CardTitle>
            <CardDescription>Preencha as informações do aluno.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="modulo">Módulo</Label>
                <ToggleGroup value={modulo} onValueChange={setModulo} type="single" className="justify-start">
                  <ToggleGroupItem value="Módulo 2" aria-label="2">
                    2
                  </ToggleGroupItem>
                  <ToggleGroupItem value="Módulo 3" aria-label="3">
                    3
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rede">Rede</Label>
                <Select value={rede} onValueChange={setRede}>
                  <SelectTrigger
                    id="rede"
                    className="items-start text-zinc-500 [&_[data-description]]:hidden">
                    <SelectValue placeholder="Selecione a rede" />
                  </SelectTrigger>
                  <SelectContent>
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
              </div>
              <div className="grid gap-2">
                <Label htmlFor="celula">Célula</Label>
                <Select value={celula} onValueChange={setCelula}>
                  <SelectTrigger
                    id="celula"
                    className="items-start text-zinc-500 [&_[data-description]]:hidden">
                    <SelectValue placeholder="Selecione a célula" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      (
                        !rede
                          ? celulas
                          : celulas.filter(f => f.rede === rede)
                      ).map(s => (
                        <SelectItem key={s.celula} value={s.celula}>{s.celula}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome completo</Label>
                <Input id="nome" placeholder="Digite seu nome completo" value={nome} onChange={e => setNome(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" placeholder="Digite seu telefone (somente números)" value={telefone} onChange={e => setTelefone(e.target.value)} />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={onAdd} className="w-full">
              Adicionar
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-full md:w-4/6 h-fit">
          <CardHeader>
            <CardTitle>Listagem</CardTitle>
            <CardDescription>Ao final, clique em salvar matriculas para finalizar</CardDescription>
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
                  <TableHead>#</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  matriculas.map((r, i) => (
                    <TableRow key={i} className="bg-accent">
                      <TableCell>{r.nome}</TableCell>
                      <TableCell>{r.rede}</TableCell>
                      <TableCell>{r.celula}</TableCell>
                      <TableCell>{r.telefone}</TableCell>
                      <TableCell>{r.modulo}</TableCell>
                      <TableCell>
                        <Button onClick={() => onRemove(i)} variant="link" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button disabled={!matriculas.length || enviando} onClick={onFinish} className="w-full">
              <Check className="mr-2 h-4 w-4" /> Salvar matriculas
            </Button>
          </CardFooter>
        </Card>
      </div>
      <ModeToggle />
    </main>
  )
}
