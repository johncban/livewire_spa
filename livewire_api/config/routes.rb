Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  devise_for :users
  

  namespace :api do
    #resources :notes, only: [:index, :create, :destroy, :update] do
    #  resources :comments, only: [:create, :destroy, :update]
    #end
    resources :users, only: [:index, :create, :destroy, :update, :show]
  end


  #namespace :api, path: '/', constraints: { subdomain: 'api' } do
  #  resources :users, only: [:show]
  #end
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  #resources :users, only: [:show]
end
