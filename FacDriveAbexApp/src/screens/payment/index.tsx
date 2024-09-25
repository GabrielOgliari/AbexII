import React from 'react';
import { View } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components/native';
import { MainTemplate } from '../../components/templates/Main';
import { Loader } from '../../components/UI/atoms/Loader';
import { Text } from '../../components/UI/atoms/Text/styles';
import { dispatchToast } from '../../helpers/dispatchToast';
import paymentService from '../../services/payment/payment-service';
import { Card } from './components/Card';

export const PaymentScreen = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['get-payment-history'],
    queryFn: (statusId: number) => paymentService.getPaymentHistory(statusId),
    onError: () =>
      dispatchToast({ title: 'Erro ao carregar histórico!', type: 'error' }),
  });

  const hasPayments = data?.length >= 1;

  const setPaymentStatusMutation = useMutation({
    mutationFn: (statusId: number) => paymentService.setPaymentStatus(statusId),
    onSuccess: () => {
      dispatchToast({ title: 'Confirmação de pagamento realizada!' });
      refetch();
    },
    onError: () =>
      dispatchToast({ title: 'Erro ao alterar status!', type: 'error' }),
  });

  // const { data, isLoading } = useQuery({
  //   queryKey: ['test'],
  //   queryFn: async (statusId: number) => paymentService.getPaymentHistory(statusId),
  //   onError: () =>
  //     dispatchToast({ title: 'Erro ao carregar histórico!', type: 'error' }),
  //   initialData: mockedData,
  // });

  return (
    <MainTemplate title="Pagamentos">
      {(isLoading || setPaymentStatusMutation.isLoading) && <Loader />}

      {!hasPayments ? (
        <View
          style={{
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Text>Não existem pagamentos pendentes</Text>
        </View>
      ) : (
        <History
          data={data}
          renderItem={({ item }) => (
            <Card
              passengerName={item.passengerName}
              costRide={item.costRide}
              image={item.image}
              onStatus={() => setPaymentStatusMutation.mutate(item.id)}
            />
          )}
        />
      )}
    </MainTemplate>
  );
};

export const History = styled.FlatList`
  width: 100%;
  padding: 10px;
`;
