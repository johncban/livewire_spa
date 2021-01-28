class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password_digest
  has_many :portfolios, :dependent => :destroy
  #has_many :stocks
end
