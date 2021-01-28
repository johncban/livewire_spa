class PortfolioSerializer < ActiveModel::Serializer
  attributes :id, :portfolio_name, :user_id
  belongs_to :user
  #has_many :stocks, :dependent => :destroy
end
