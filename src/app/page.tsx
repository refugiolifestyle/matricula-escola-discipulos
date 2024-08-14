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
                    <SelectItem value="Refúgio 1">Refúgio 1</SelectItem>
                    <SelectItem value="Refúgio 2">Refúgio 2</SelectItem>
                    <SelectItem value="Refúgio 3">Refúgio 3</SelectItem>
                    <SelectItem value="Refúgio 4">Refúgio 4</SelectItem>
                    <SelectItem value="Refúgio 5">Refúgio 5</SelectItem>
                    <SelectItem value="Refúgio 6">Refúgio 6</SelectItem>
                    <SelectItem value="Refúgio 7">Refúgio 7</SelectItem>
                    <SelectItem value="Refúgio 8">Refúgio 8</SelectItem>
                    <SelectItem value="Refúgio 9">Refúgio 9</SelectItem>
                    <SelectItem value="Refúgio 10">Refúgio 10</SelectItem>
                    <SelectItem value="Refúgio 11">Refúgio 11</SelectItem>
                    <SelectItem value="Refúgio 12">Refúgio 12</SelectItem>
                    <SelectItem value="Refúgio 13">Refúgio 13</SelectItem>
                    <SelectItem value="Refúgio 14">Refúgio 14</SelectItem>
                    <SelectItem value="Refúgio 15">Refúgio 15</SelectItem>
                    <SelectItem value="Refúgio 16">Refúgio 16</SelectItem>
                    <SelectItem value="Refúgio 17">Refúgio 17</SelectItem>
                    <SelectItem value="Refúgio 18">Refúgio 18</SelectItem>
                    <SelectItem value="Refúgio 19">Refúgio 19</SelectItem>
                    <SelectItem value="Refúgio 20">Refúgio 20</SelectItem>
                    <SelectItem value="Refúgio 21">Refúgio 21</SelectItem>
                    <SelectItem value="Refúgio 22">Refúgio 22</SelectItem>
                    <SelectItem value="Refúgio 23">Refúgio 23</SelectItem>
                    <SelectItem value="Refúgio 24">Refúgio 24</SelectItem>
                    <SelectItem value="Refúgio 25">Refúgio 25</SelectItem>
                    <SelectItem value="Refúgio 26">Refúgio 26</SelectItem>
                    <SelectItem value="Refúgio 27">Refúgio 27</SelectItem>
                    <SelectItem value="Refúgio 28">Refúgio 28</SelectItem>
                    <SelectItem value="Refúgio 29">Refúgio 29</SelectItem>
                    <SelectItem value="Refúgio 30">Refúgio 30</SelectItem>
                    <SelectItem value="Refúgio 31">Refúgio 31</SelectItem>
                    <SelectItem value="Refúgio 32">Refúgio 32</SelectItem>
                    <SelectItem value="Refúgio 33">Refúgio 33</SelectItem>
                    <SelectItem value="Refúgio 34">Refúgio 34</SelectItem>
                    <SelectItem value="Refúgio 35">Refúgio 35</SelectItem>
                    <SelectItem value="Refúgio 36">Refúgio 36</SelectItem>
                    <SelectItem value="Refúgio 37">Refúgio 37</SelectItem>
                    <SelectItem value="Refúgio 38">Refúgio 38</SelectItem>
                    <SelectItem value="Refúgio 39">Refúgio 39</SelectItem>
                    <SelectItem value="Refúgio 40">Refúgio 40</SelectItem>
                    <SelectItem value="Refúgio 41">Refúgio 41</SelectItem>
                    <SelectItem value="Refúgio 42">Refúgio 42</SelectItem>
                    <SelectItem value="Refúgio 43">Refúgio 43</SelectItem>
                    <SelectItem value="Refúgio 44">Refúgio 44</SelectItem>
                    <SelectItem value="Refúgio 45">Refúgio 45</SelectItem>
                    <SelectItem value="Refúgio 46">Refúgio 46</SelectItem>
                    <SelectItem value="Refúgio 47">Refúgio 47</SelectItem>
                    <SelectItem value="Refúgio 48">Refúgio 48</SelectItem>
                    <SelectItem value="Refúgio 49">Refúgio 49</SelectItem>
                    <SelectItem value="Refúgio 50">Refúgio 50</SelectItem>
                    <SelectItem value="Refúgio 51">Refúgio 51</SelectItem>
                    <SelectItem value="Refúgio 52">Refúgio 52</SelectItem>
                    <SelectItem value="Refúgio 53">Refúgio 53</SelectItem>
                    <SelectItem value="Refúgio 54">Refúgio 54</SelectItem>
                    <SelectItem value="Refúgio 55">Refúgio 55</SelectItem>
                    <SelectItem value="Refúgio 56">Refúgio 56</SelectItem>
                    <SelectItem value="Refúgio 57">Refúgio 57</SelectItem>
                    <SelectItem value="Refúgio 58">Refúgio 58</SelectItem>
                    <SelectItem value="Refúgio 59">Refúgio 59</SelectItem>
                    <SelectItem value="Refúgio 60">Refúgio 60</SelectItem>
                    <SelectItem value="Refúgio 61">Refúgio 61</SelectItem>
                    <SelectItem value="Refúgio 62">Refúgio 62</SelectItem>
                    <SelectItem value="Refúgio 63">Refúgio 63</SelectItem>
                    <SelectItem value="Refúgio 64">Refúgio 64</SelectItem>
                    <SelectItem value="Refúgio 65">Refúgio 65</SelectItem>
                    <SelectItem value="Refúgio 66">Refúgio 66</SelectItem>
                    <SelectItem value="Refúgio 67">Refúgio 67</SelectItem>
                    <SelectItem value="Refúgio 68">Refúgio 68</SelectItem>
                    <SelectItem value="Refúgio 69">Refúgio 69</SelectItem>
                    <SelectItem value="Refúgio 70">Refúgio 70</SelectItem>
                    <SelectItem value="Refúgio 71">Refúgio 71</SelectItem>
                    <SelectItem value="Refúgio 72">Refúgio 72</SelectItem>
                    <SelectItem value="Refúgio 73">Refúgio 73</SelectItem>
                    <SelectItem value="Refúgio 74">Refúgio 74</SelectItem>
                    <SelectItem value="Refúgio 75">Refúgio 75</SelectItem>
                    <SelectItem value="Refúgio 76">Refúgio 76</SelectItem>
                    <SelectItem value="Refúgio 77">Refúgio 77</SelectItem>
                    <SelectItem value="Refúgio 78">Refúgio 78</SelectItem>
                    <SelectItem value="Refúgio 79">Refúgio 79</SelectItem>
                    <SelectItem value="Refúgio 80">Refúgio 80</SelectItem>
                    <SelectItem value="Refúgio 81">Refúgio 81</SelectItem>
                    <SelectItem value="Refúgio 82">Refúgio 82</SelectItem>
                    <SelectItem value="Refúgio 83">Refúgio 83</SelectItem>
                    <SelectItem value="Refúgio 84">Refúgio 84</SelectItem>
                    <SelectItem value="Refúgio 85">Refúgio 85</SelectItem>
                    <SelectItem value="Refúgio 86">Refúgio 86</SelectItem>
                    <SelectItem value="Refúgio 87">Refúgio 87</SelectItem>
                    <SelectItem value="Refúgio 88">Refúgio 88</SelectItem>
                    <SelectItem value="Refúgio 89">Refúgio 89</SelectItem>
                    <SelectItem value="Refúgio 90">Refúgio 90</SelectItem>
                    <SelectItem value="Refúgio 91">Refúgio 91</SelectItem>
                    <SelectItem value="Refúgio 92">Refúgio 92</SelectItem>
                    <SelectItem value="Refúgio 93">Refúgio 93</SelectItem>
                    <SelectItem value="Refúgio 94">Refúgio 94</SelectItem>
                    <SelectItem value="Refúgio 95">Refúgio 95</SelectItem>
                    <SelectItem value="Refúgio 96">Refúgio 96</SelectItem>
                    <SelectItem value="Refúgio 97">Refúgio 97</SelectItem>
                    <SelectItem value="Refúgio 98">Refúgio 98</SelectItem>
                    <SelectItem value="Refúgio 99">Refúgio 99</SelectItem>
                    <SelectItem value="Refúgio 100">Refúgio 100</SelectItem>
                    <SelectItem value="Refúgio 101">Refúgio 101</SelectItem>
                    <SelectItem value="Refúgio 102">Refúgio 102</SelectItem>
                    <SelectItem value="Refúgio 103">Refúgio 103</SelectItem>
                    <SelectItem value="Refúgio 104">Refúgio 104</SelectItem>
                    <SelectItem value="Refúgio 105">Refúgio 105</SelectItem>
                    <SelectItem value="Refúgio 106">Refúgio 106</SelectItem>
                    <SelectItem value="Refúgio 107">Refúgio 107</SelectItem>
                    <SelectItem value="Refúgio 108">Refúgio 108</SelectItem>
                    <SelectItem value="Refúgio 109">Refúgio 109</SelectItem>
                    <SelectItem value="Refúgio 110">Refúgio 110</SelectItem>
                    <SelectItem value="Refúgio 111">Refúgio 111</SelectItem>
                    <SelectItem value="Refúgio 112">Refúgio 112</SelectItem>
                    <SelectItem value="Refúgio 113">Refúgio 113</SelectItem>
                    <SelectItem value="Refúgio 114">Refúgio 114</SelectItem>
                    <SelectItem value="Refúgio 115">Refúgio 115</SelectItem>
                    <SelectItem value="Refúgio 116">Refúgio 116</SelectItem>
                    <SelectItem value="Refúgio 117">Refúgio 117</SelectItem>
                    <SelectItem value="Refúgio 118">Refúgio 118</SelectItem>
                    <SelectItem value="Refúgio 119">Refúgio 119</SelectItem>
                    <SelectItem value="Refúgio 120">Refúgio 120</SelectItem>
                    <SelectItem value="Refúgio 121">Refúgio 121</SelectItem>
                    <SelectItem value="Refúgio 122">Refúgio 122</SelectItem>
                    <SelectItem value="Refúgio 123">Refúgio 123</SelectItem>
                    <SelectItem value="Refúgio 124">Refúgio 124</SelectItem>
                    <SelectItem value="Refúgio 125">Refúgio 125</SelectItem>
                    <SelectItem value="Refúgio 126">Refúgio 126</SelectItem>
                    <SelectItem value="Refúgio 127">Refúgio 127</SelectItem>
                    <SelectItem value="Refúgio 128">Refúgio 128</SelectItem>
                    <SelectItem value="Refúgio 129">Refúgio 129</SelectItem>
                    <SelectItem value="Refúgio 130">Refúgio 130</SelectItem>
                    <SelectItem value="Refúgio 131">Refúgio 131</SelectItem>
                    <SelectItem value="Refúgio 132">Refúgio 132</SelectItem>
                    <SelectItem value="Refúgio 133">Refúgio 133</SelectItem>
                    <SelectItem value="Refúgio 134">Refúgio 134</SelectItem>
                    <SelectItem value="Refúgio 135">Refúgio 135</SelectItem>
                    <SelectItem value="Refúgio 136">Refúgio 136</SelectItem>
                    <SelectItem value="Refúgio 137">Refúgio 137</SelectItem>
                    <SelectItem value="Refúgio 138">Refúgio 138</SelectItem>
                    <SelectItem value="Refúgio 139">Refúgio 139</SelectItem>
                    <SelectItem value="Refúgio 140">Refúgio 140</SelectItem>
                    <SelectItem value="Refúgio 141">Refúgio 141</SelectItem>
                    <SelectItem value="Refúgio 142">Refúgio 142</SelectItem>
                    <SelectItem value="Refúgio 143">Refúgio 143</SelectItem>
                    <SelectItem value="Refúgio 144">Refúgio 144</SelectItem>
                    <SelectItem value="Refúgio 145">Refúgio 145</SelectItem>
                    <SelectItem value="Refúgio 146">Refúgio 146</SelectItem>
                    <SelectItem value="Refúgio 147">Refúgio 147</SelectItem>
                    <SelectItem value="Refúgio 148">Refúgio 148</SelectItem>
                    <SelectItem value="Refúgio 149">Refúgio 149</SelectItem>
                    <SelectItem value="Refúgio 150">Refúgio 150</SelectItem>
                    <SelectItem value="Refúgio 151">Refúgio 151</SelectItem>
                    <SelectItem value="Refúgio 152">Refúgio 152</SelectItem>
                    <SelectItem value="Refúgio 153">Refúgio 153</SelectItem>
                    <SelectItem value="Refúgio 154">Refúgio 154</SelectItem>
                    <SelectItem value="Refúgio 155">Refúgio 155</SelectItem>
                    <SelectItem value="Refúgio 156">Refúgio 156</SelectItem>
                    <SelectItem value="Refúgio 157">Refúgio 157</SelectItem>
                    <SelectItem value="Refúgio 158">Refúgio 158</SelectItem>
                    <SelectItem value="Refúgio 159">Refúgio 159</SelectItem>
                    <SelectItem value="Refúgio 160">Refúgio 160</SelectItem>
                    <SelectItem value="Refúgio 161">Refúgio 161</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome completo</Label>
                <Input id="nome" placeholder="Digite seu nome completo" value={nome} onChange={e => setNome(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input type="number" id="telefone" placeholder="Digite seu telefone" value={telefone} onChange={e => setTelefone(e.target.value)} />
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
