Rails.application.routes.draw do

  #post 'user_token' => 'user_token#create'
  #resources :users
  
  scope '/auth' do
    post '/signin', to: 'user_token#create'
    post '/signup', to: 'users#create'
  end


  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :users, only: [:index, :create, :destroy, :update, :show] do 
        resources :portfolios, only: [:index, :create, :destroy, :update, :show] #do
          #resources :stocks, only: [:index, :create, :destroy, :update, :show]
        #end
      end
    end
  end



end
