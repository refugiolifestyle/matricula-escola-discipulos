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

type Matricula = {
  modulo: string;
  rede: string;
  celula: string;
  nome: string;
  telefone: string;
}

export default function Home() {
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);
  const [modulo, setModulo] = useState<string>();
  const [rede, setRede] = useState<string>();
  const [celula, setCelula] = useState<string>();
  const [nome, setNome] = useState<string>();
  const [telefone, setTelefone] = useState<string>();

  function onAdd() {
    if (
      !modulo ||
      !rede ||
      !celula ||
      !nome ||
      !telefone
    ) {
      alert("Campo obrigatório");
      return;
    }

    setMatriculas(old => ([
      ...old,
      {
        modulo,
        rede,
        celula,
        nome,
        telefone
      } as Matricula
    ]))

    setNome('')
    setTelefone('')
  }

  function onRemove(i: number) {
    setMatriculas(old => old.filter((v, o) => i !== o))
  }

  async function onFinish() {
    for (let matricula of matriculas) {
      await push(ref(database, 'matriculas'), matricula)
    }

    alert("Matriculas salvas com sucesso");

    setMatriculas([])
    setModulo('')
    setRede('')
    setCelula('')
    setNome('')
    setTelefone('')
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
                  <ToggleGroupItem value="2" aria-label="2">
                    2
                  </ToggleGroupItem>
                  <ToggleGroupItem value="3" aria-label="3">
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
                    <SelectItem value="1">Rede 1</SelectItem>
                    <SelectItem value="2">Rede 2</SelectItem>
                    <SelectItem value="3">Rede 3</SelectItem>
                    <SelectItem value="4">Rede 4</SelectItem>
                    <SelectItem value="5">Rede 5</SelectItem>
                    <SelectItem value="6">Rede 6</SelectItem>
                    <SelectItem value="7">Rede 7</SelectItem>
                    <SelectItem value="8">Rede 8</SelectItem>
                    <SelectItem value="9">Rede 9</SelectItem>
                    <SelectItem value="10">Rede 10</SelectItem>
                    <SelectItem value="11">Rede 11</SelectItem>
                    <SelectItem value="12">Rede 12</SelectItem>
                    <SelectItem value="13">Rede 13</SelectItem>
                    <SelectItem value="14">Rede 14</SelectItem>
                    <SelectItem value="16">Rede 16</SelectItem>
                    <SelectItem value="17">Rede 17</SelectItem>
                    <SelectItem value="18">Rede 18</SelectItem>
                    <SelectItem value="19">Rede 19</SelectItem>
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
                    <SelectItem value="1">Refúgio 1</SelectItem>
                    <SelectItem value="2">Refúgio 2</SelectItem>
                    <SelectItem value="3">Refúgio 3</SelectItem>
                    <SelectItem value="4">Refúgio 4</SelectItem>
                    <SelectItem value="5">Refúgio 5</SelectItem>
                    <SelectItem value="6">Refúgio 6</SelectItem>
                    <SelectItem value="7">Refúgio 7</SelectItem>
                    <SelectItem value="8">Refúgio 8</SelectItem>
                    <SelectItem value="9">Refúgio 9</SelectItem>
                    <SelectItem value="10">Refúgio 10</SelectItem>
                    <SelectItem value="11">Refúgio 11</SelectItem>
                    <SelectItem value="12">Refúgio 12</SelectItem>
                    <SelectItem value="13">Refúgio 13</SelectItem>
                    <SelectItem value="14">Refúgio 14</SelectItem>
                    <SelectItem value="15">Refúgio 15</SelectItem>
                    <SelectItem value="16">Refúgio 16</SelectItem>
                    <SelectItem value="17">Refúgio 17</SelectItem>
                    <SelectItem value="18">Refúgio 18</SelectItem>
                    <SelectItem value="19">Refúgio 19</SelectItem>
                    <SelectItem value="20">Refúgio 20</SelectItem>
                    <SelectItem value="21">Refúgio 21</SelectItem>
                    <SelectItem value="22">Refúgio 22</SelectItem>
                    <SelectItem value="23">Refúgio 23</SelectItem>
                    <SelectItem value="24">Refúgio 24</SelectItem>
                    <SelectItem value="25">Refúgio 25</SelectItem>
                    <SelectItem value="26">Refúgio 26</SelectItem>
                    <SelectItem value="27">Refúgio 27</SelectItem>
                    <SelectItem value="28">Refúgio 28</SelectItem>
                    <SelectItem value="29">Refúgio 29</SelectItem>
                    <SelectItem value="30">Refúgio 30</SelectItem>
                    <SelectItem value="31">Refúgio 31</SelectItem>
                    <SelectItem value="32">Refúgio 32</SelectItem>
                    <SelectItem value="33">Refúgio 33</SelectItem>
                    <SelectItem value="34">Refúgio 34</SelectItem>
                    <SelectItem value="35">Refúgio 35</SelectItem>
                    <SelectItem value="36">Refúgio 36</SelectItem>
                    <SelectItem value="37">Refúgio 37</SelectItem>
                    <SelectItem value="38">Refúgio 38</SelectItem>
                    <SelectItem value="39">Refúgio 39</SelectItem>
                    <SelectItem value="40">Refúgio 40</SelectItem>
                    <SelectItem value="41">Refúgio 41</SelectItem>
                    <SelectItem value="42">Refúgio 42</SelectItem>
                    <SelectItem value="43">Refúgio 43</SelectItem>
                    <SelectItem value="44">Refúgio 44</SelectItem>
                    <SelectItem value="45">Refúgio 45</SelectItem>
                    <SelectItem value="46">Refúgio 46</SelectItem>
                    <SelectItem value="47">Refúgio 47</SelectItem>
                    <SelectItem value="48">Refúgio 48</SelectItem>
                    <SelectItem value="49">Refúgio 49</SelectItem>
                    <SelectItem value="50">Refúgio 50</SelectItem>
                    <SelectItem value="51">Refúgio 51</SelectItem>
                    <SelectItem value="52">Refúgio 52</SelectItem>
                    <SelectItem value="53">Refúgio 53</SelectItem>
                    <SelectItem value="54">Refúgio 54</SelectItem>
                    <SelectItem value="55">Refúgio 55</SelectItem>
                    <SelectItem value="56">Refúgio 56</SelectItem>
                    <SelectItem value="57">Refúgio 57</SelectItem>
                    <SelectItem value="58">Refúgio 58</SelectItem>
                    <SelectItem value="59">Refúgio 59</SelectItem>
                    <SelectItem value="60">Refúgio 60</SelectItem>
                    <SelectItem value="61">Refúgio 61</SelectItem>
                    <SelectItem value="62">Refúgio 62</SelectItem>
                    <SelectItem value="63">Refúgio 63</SelectItem>
                    <SelectItem value="64">Refúgio 64</SelectItem>
                    <SelectItem value="65">Refúgio 65</SelectItem>
                    <SelectItem value="66">Refúgio 66</SelectItem>
                    <SelectItem value="67">Refúgio 67</SelectItem>
                    <SelectItem value="68">Refúgio 68</SelectItem>
                    <SelectItem value="69">Refúgio 69</SelectItem>
                    <SelectItem value="70">Refúgio 70</SelectItem>
                    <SelectItem value="71">Refúgio 71</SelectItem>
                    <SelectItem value="72">Refúgio 72</SelectItem>
                    <SelectItem value="73">Refúgio 73</SelectItem>
                    <SelectItem value="74">Refúgio 74</SelectItem>
                    <SelectItem value="75">Refúgio 75</SelectItem>
                    <SelectItem value="76">Refúgio 76</SelectItem>
                    <SelectItem value="77">Refúgio 77</SelectItem>
                    <SelectItem value="78">Refúgio 78</SelectItem>
                    <SelectItem value="79">Refúgio 79</SelectItem>
                    <SelectItem value="80">Refúgio 80</SelectItem>
                    <SelectItem value="81">Refúgio 81</SelectItem>
                    <SelectItem value="82">Refúgio 82</SelectItem>
                    <SelectItem value="83">Refúgio 83</SelectItem>
                    <SelectItem value="84">Refúgio 84</SelectItem>
                    <SelectItem value="85">Refúgio 85</SelectItem>
                    <SelectItem value="86">Refúgio 86</SelectItem>
                    <SelectItem value="87">Refúgio 87</SelectItem>
                    <SelectItem value="88">Refúgio 88</SelectItem>
                    <SelectItem value="89">Refúgio 89</SelectItem>
                    <SelectItem value="90">Refúgio 90</SelectItem>
                    <SelectItem value="91">Refúgio 91</SelectItem>
                    <SelectItem value="92">Refúgio 92</SelectItem>
                    <SelectItem value="93">Refúgio 93</SelectItem>
                    <SelectItem value="94">Refúgio 94</SelectItem>
                    <SelectItem value="95">Refúgio 95</SelectItem>
                    <SelectItem value="96">Refúgio 96</SelectItem>
                    <SelectItem value="97">Refúgio 97</SelectItem>
                    <SelectItem value="98">Refúgio 98</SelectItem>
                    <SelectItem value="99">Refúgio 99</SelectItem>
                    <SelectItem value="100">Refúgio 100</SelectItem>
                    <SelectItem value="101">Refúgio 101</SelectItem>
                    <SelectItem value="102">Refúgio 102</SelectItem>
                    <SelectItem value="103">Refúgio 103</SelectItem>
                    <SelectItem value="104">Refúgio 104</SelectItem>
                    <SelectItem value="105">Refúgio 105</SelectItem>
                    <SelectItem value="106">Refúgio 106</SelectItem>
                    <SelectItem value="107">Refúgio 107</SelectItem>
                    <SelectItem value="108">Refúgio 108</SelectItem>
                    <SelectItem value="109">Refúgio 109</SelectItem>
                    <SelectItem value="110">Refúgio 110</SelectItem>
                    <SelectItem value="111">Refúgio 111</SelectItem>
                    <SelectItem value="112">Refúgio 112</SelectItem>
                    <SelectItem value="113">Refúgio 113</SelectItem>
                    <SelectItem value="114">Refúgio 114</SelectItem>
                    <SelectItem value="115">Refúgio 115</SelectItem>
                    <SelectItem value="116">Refúgio 116</SelectItem>
                    <SelectItem value="117">Refúgio 117</SelectItem>
                    <SelectItem value="118">Refúgio 118</SelectItem>
                    <SelectItem value="119">Refúgio 119</SelectItem>
                    <SelectItem value="120">Refúgio 120</SelectItem>
                    <SelectItem value="121">Refúgio 121</SelectItem>
                    <SelectItem value="122">Refúgio 122</SelectItem>
                    <SelectItem value="123">Refúgio 123</SelectItem>
                    <SelectItem value="124">Refúgio 124</SelectItem>
                    <SelectItem value="125">Refúgio 125</SelectItem>
                    <SelectItem value="126">Refúgio 126</SelectItem>
                    <SelectItem value="127">Refúgio 127</SelectItem>
                    <SelectItem value="128">Refúgio 128</SelectItem>
                    <SelectItem value="129">Refúgio 129</SelectItem>
                    <SelectItem value="130">Refúgio 130</SelectItem>
                    <SelectItem value="131">Refúgio 131</SelectItem>
                    <SelectItem value="132">Refúgio 132</SelectItem>
                    <SelectItem value="133">Refúgio 133</SelectItem>
                    <SelectItem value="134">Refúgio 134</SelectItem>
                    <SelectItem value="135">Refúgio 135</SelectItem>
                    <SelectItem value="136">Refúgio 136</SelectItem>
                    <SelectItem value="137">Refúgio 137</SelectItem>
                    <SelectItem value="138">Refúgio 138</SelectItem>
                    <SelectItem value="139">Refúgio 139</SelectItem>
                    <SelectItem value="140">Refúgio 140</SelectItem>
                    <SelectItem value="141">Refúgio 141</SelectItem>
                    <SelectItem value="142">Refúgio 142</SelectItem>
                    <SelectItem value="143">Refúgio 143</SelectItem>
                    <SelectItem value="144">Refúgio 144</SelectItem>
                    <SelectItem value="145">Refúgio 145</SelectItem>
                    <SelectItem value="146">Refúgio 146</SelectItem>
                    <SelectItem value="147">Refúgio 147</SelectItem>
                    <SelectItem value="148">Refúgio 148</SelectItem>
                    <SelectItem value="149">Refúgio 149</SelectItem>
                    <SelectItem value="150">Refúgio 150</SelectItem>
                    <SelectItem value="151">Refúgio 151</SelectItem>
                    <SelectItem value="152">Refúgio 152</SelectItem>
                    <SelectItem value="153">Refúgio 153</SelectItem>
                    <SelectItem value="154">Refúgio 154</SelectItem>
                    <SelectItem value="155">Refúgio 155</SelectItem>
                    <SelectItem value="156">Refúgio 156</SelectItem>
                    <SelectItem value="157">Refúgio 157</SelectItem>
                    <SelectItem value="158">Refúgio 158</SelectItem>
                    <SelectItem value="159">Refúgio 159</SelectItem>
                    <SelectItem value="160">Refúgio 160</SelectItem>
                    <SelectItem value="161">Refúgio 161</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome completo</Label>
                <Input id="nome" placeholder="Digite seu nome completo" value={nome} onChange={e => setNome(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" placeholder="Digite seu telefone" value={telefone} onChange={e => setTelefone(e.target.value)} />
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
            <Button disabled={!matriculas.length} onClick={onFinish} className="w-full bg-green-600 hover:bg-green-700">
              <Check className="mr-2 h-4 w-4" /> Salvar matriculas
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
