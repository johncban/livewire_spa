class StockSerializer < ActiveModel::Serializer
  attributes :id, :stock_name, :quantity, :portfolio_id, :user_id
  belongs_to :user
  belongs_to :portfolio
end
