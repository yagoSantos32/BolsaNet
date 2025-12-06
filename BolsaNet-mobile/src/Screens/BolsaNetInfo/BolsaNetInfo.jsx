import React from "react";
import { View, Text, ScrollView } from "react-native";
import sharedStyles from "../../Constants/sharedStyles";

function BolsaNetInfo() {
  return (
    <ScrollView 
      contentContainerStyle={ { padding: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ marginBottom: 25 }}>
        <Text style={{ 
          fontSize: 24, 
          fontWeight: 'bold', 
          color: '#333',
          textAlign: 'center',
          marginBottom: 10
        }}>
          O que é BolsaNet?
        </Text>
      </View>

      <View style={{ 
        padding: 20, 
        backgroundColor: '#f8f9fa', 
        borderRadius: 16, 
        borderWidth: 1,
        borderColor: '#e9ecef'
      }}>
        <Text style={{ 
          fontSize: 16, 
          lineHeight: 24, 
          color: '#333',
          textAlign: 'justify'
        }}>
          O BolsaNet é um projeto educacional inovador que tem como objetivo principal promover a inclusão digital e incentivar o desempenho acadêmico dos estudantes por meio do acesso à internet como forma de benefício. Reconhecendo que o acesso à informação e às tecnologias digitais é um fator determinante para o aprendizado, o BolsaNet busca reduzir a desigualdade educacional, proporcionando aos alunos a oportunidade de utilizar a internet de forma educativa e produtiva, especialmente para aqueles que possuem acesso limitado a recursos tecnológicos.
        </Text>
      </View>

      <View style={{ marginVertical: 20 }}>
        <Text style={{ 
          fontSize: 18, 
          fontWeight: '600', 
          color: '#333',
          marginBottom: 12,
          textAlign: 'center'
        }}>
          Como funciona?
        </Text>
        
        <View style={{ 
          padding: 20, 
          backgroundColor: '#e3f2fd', 
          borderRadius: 12, 
          borderWidth: 1,
          borderColor: '#bbdefb'
        }}>
          <Text style={{ 
            fontSize: 16, 
            lineHeight: 24, 
            color: '#1976d2',
            textAlign: 'justify'
          }}>
            O funcionamento do BolsaNet está baseado no monitoramento contínuo do desempenho escolar dos alunos, incluindo notas, frequência e participação em atividades educacionais. Com base nesses critérios, o sistema calcula e atribui benefícios proporcionais, geralmente na forma de franquias de internet ou pacotes de dados, que podem ser utilizados para estudos, pesquisas ou acesso a conteúdos educativos online.
          </Text>
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ 
          fontSize: 18, 
          fontWeight: '600', 
          color: '#333',
          marginBottom: 12
        }}>
          Estrutura do projeto:
        </Text>
        
        <View style={{ 
          padding: 20, 
          backgroundColor: '#f1f8e9', 
          borderRadius: 12, 
          borderWidth: 1,
          borderColor: '#c8e6c9'
        }}>
          <Text style={{ 
            fontSize: 16, 
            lineHeight: 24, 
            color: '#2e7d32',
            textAlign: 'justify'
          }}>
            O BolsaNet é estruturado em duas frentes principais: uma plataforma web, voltada para a administração e controle do sistema, onde professores e administradores podem cadastrar alunos, registrar seus resultados acadêmicos e gerenciar a distribuição dos benefícios; e um aplicativo mobile, onde os alunos podem acompanhar seu desempenho, consultar seu saldo de internet, verificar seu histórico de benefícios e receber notificações relacionadas às suas conquistas escolares.
          </Text>
        </View>
      </View>

      <View style={{ marginBottom: 40 }}>
        <Text style={{ 
          fontSize: 18, 
          fontWeight: '600', 
          color: '#333',
          marginBottom: 12
        }}>
          Impacto educacional:
        </Text>
        
        <View style={{ 
          padding: 20, 
          backgroundColor: '#fff3e0', 
          borderRadius: 12, 
          borderWidth: 1,
          borderColor: '#ffcc80'
        }}>
          <Text style={{ 
            fontSize: 16, 
            lineHeight: 24, 
            color: '#ef6c00',
            textAlign: 'justify'
          }}>
            Além de estimular o aprendizado, o BolsaNet também promove responsabilidade e autonomia entre os estudantes, ao vincular o acesso a recursos digitais diretamente ao esforço e à dedicação escolar. O projeto contribui, portanto, para a formação de uma cultura de valorização do conhecimento e do desempenho acadêmico, ao mesmo tempo em que fortalece a inclusão digital.
          </Text>
        </View>
      </View>

      <View style={{ 
        padding: 20, 
        backgroundColor: '#e8f5e8', 
        borderRadius: 16, 
        borderWidth: 2,
        borderColor: '#4caf50',
        alignItems: 'center'
      }}>
        <Text style={{ 
          fontSize: 18, 
          fontWeight: 'bold', 
          color: '#2e7d32',
          textAlign: 'center',
          marginBottom: 8
        }}>
          Em síntese:
        </Text>
        <Text style={{ 
          fontSize: 16, 
          lineHeight: 24, 
          color: '#2e7d32',
          textAlign: 'center'
        }}>
          O BolsaNet representa uma estratégia inovadora e eficaz de educação inclusiva e motivadora, criando um ciclo positivo em que o desempenho escolar é reconhecido e recompensado, a inclusão digital é promovida e os estudantes se tornam protagonistas do próprio aprendizado.
        </Text>
      </View>
    </ScrollView>
  );
}

export default BolsaNetInfo;
