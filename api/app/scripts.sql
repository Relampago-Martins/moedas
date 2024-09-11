--script para deletar as despesas sem categoria
DELETE FROM moedas_movimentacao WHERE categoria_id IS NULL;